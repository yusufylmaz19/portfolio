## Azure Web App Deployment Guide: Automation with GitHub Actions and Docker

![Azure](images/blog/4/azure.webp)

Hello! Today, we will explore how to Dockerize web applications built with Next.js, host them on Azure Container Registry (ACR), and deploy them within the Azure Web App ecosystem. Moreover, we will transform this entire process into a fully automated CI/CD pipeline using GitHub Actions.

### 1. Azure App Registration Configuration

We need to create an App Registration to securely access Azure resources through GitHub Actions. This registration will manage role-based authentication and authorization (RBAC) processes.

You can create the app registration via Azure portal > App Registrations > New registration. You can give it a name like gh-actions-login. We will use this registration in the following steps.

### 2. Azure Container Registry (ACR) Configuration

We are creating an Azure Container Registry to securely store our Docker images. This ACR can be created under an existing Resource Group or within a new one. The ACR name must be globally unique and consist entirely of lowercase letters. (e.g.: myapp_container)

Since we will use this ACR for push and update operations through GitHub Actions, we need to add our App Registration to our container. Follow the steps below for this.

**Permission Assignment Steps:**

- Go to the Access Control (IAM) tab from the ACR menu.
- Follow the path Add > Add role assignment.
- Under Privileged administrator roles, select the following roles: Contributor for resource management; AcrPush for image upload permissions.
- In the Assign access to section, select the "User, group, or service principal" option.
- In the Select members section, search for and select the gh-actions-login application, then save.

### 3. Azure Web App (App Service) and Environment Configuration

We are setting up a scalable and secure structure while creating the Azure Web App service where we will deploy our application. Choose a unique name (e.g.: myapp-prod). The publish type should be set to Container, and the operating system should be Linux.

> The most critical point to pay attention to here is configuring both the ACR and the Azure Web App service in the same Resource Group and the same Region (e.g., West Europe) to minimize performance loss and latency. This strategy not only improves server response times for users accessing from Turkey's location but also accelerates data traffic between Azure services themselves.

**Deployment Slots:** You can create different environments such as Test and Staging within a single App Service. This way, you can test new features independently from your main application (Production).

> A Standard or higher App Service Plan is required to use the slot feature. If you don't have this plan, you can proceed by creating a separate Web App for testing.

**Requirement: ACR Access Permission (AcrPull)**

Authorization through Managed Identity is mandatory for the Web App to pull Docker images from the ACR.

**Identity Definition:** Go to the Identity tab from the Web App menu. Set the System assigned status to "On" and save.

**Role Assignment (RBAC):** Navigate to your ACR resource and follow this path:

- Access Control (IAM) > Add role assignment.
- Role: AcrPull (under the Privileged tab).
- Assign access to: Managed Identity.
- Select Members: Search for and select your Web App name.

**Important:** If you are using slots (Test/Staging), remember that you need to repeat this authorization process separately for each slot.

### 4. GitHub Secrets Configuration and Data Collection

![Git](images/blog/4/git.png)

For the automation to work smoothly, you need to securely define the identity and resource information from Azure in your GitHub repository. The table below summarizes which information to get from where and which key to store it under on the GitHub side.

| Key                               | Description                       | Where will you get from                           |
| --------------------------------- | --------------------------------- | ------------------------------------------------- |
| `ACR_LOGIN_SERVER`                | Azure Container Registry endpoint | Container register > Settings > Access Key        |
| `ACR_REPO_NAME`                   | Azure Container Repo name         | Could be anything. exp:'panel'                    |
| `AZUREAPPSERVICE_CLIENT_ID`       | App Registration Client ID        | App Register > All Application > gh-actions-login |
| `AZUREAPPSERVICE_SUBSCRIPTION_ID` | Azure Subscription ID             | Web App or Container Registry                     |
| `AZUREAPPSERVICE_TENANT_ID`       | Azure Tenant ID                   | App Register > All Application > gh-actions-login |
| `WEBAPP_NAME`                     | Azure Web App name                | Web App                                           |
| `WEBAPP_RESOURCE_GROUP`           | Web App's resource group          | Web App                                           |
| `NEXT_PUBLIC_API_URL`             | API address                       | from your .env file                               |

> Update the variables according to your own project. You can see the required secret information and where to obtain them in the table above.

**Critical Note: Repository vs. Environment Secrets**

If you use separate structures for both Test and Production in your project, you should do the following for Secret management:

- **Repository Secrets:** Add variables that are common to all environments, such as ACR_LOGIN_SERVER, TENANT_ID, and SUBSCRIPTION_ID, to this section.
- **Environment Secrets:** Define environment-specific variables like NEXT_PUBLIC_API_URL under the "Environments" (Test/Production) tab on GitHub. This way, you can run the same workflow file with different parameters for both environments.

> In your GitHub repository, follow the path Settings > Secrets and variables > Actions and enter the above data using the "New repository secret" button.

### 5. Secure Authentication: Federated Credentials Configuration

So far, we have created the App Registration, ACR, and Web App on Azure, completed region selections for high performance between services, and prepared our infrastructure for deployment by defining the necessary access permissions and secure credentials on the GitHub side.

Now, we will take this structure to a more secure level. Instead of dealing with traditional password (client secret) management, we will use Azure's modern authentication method called Workload Identity Federation. Thanks to this method, we establish a fully secure connection between GitHub and Azure that works with passwordless, certificate-based, and temporary keys.

In short, in this step, we are enabling GitHub Actions to prove its identity "without using a password" when accessing our Azure resources.

**Configuration Steps:**

- Follow the path Azure Portal > App Registrations and select the relevant registration.
- From the left menu, go to Certificates & secrets > Federated credentials tab and click the Add credential button.
- In the Federated credential scenario section, select the GitHub Actions deploying Azure resources option.

#### A. Environment-Based Authorization

If you use environments like "Test" or "Production" in your GitHub repository:

- Organization: Your GitHub username or organization name.
- Repository: Your project name.
- Entity type: Environment
- Environment Name: Test or Production.
- You will see a path like `repo:MyOrganization/MyRepository:ref:refs/environment:Production` in the Subject Identifier.

#### B. Branch-Based Authorization

To deploy main version images directly from a specific branch:

- Entity Type: Branch
- Branch Name: The main branch name that will go live (e.g.: deployment).
- You will see a path like `repo:MyOrganization/MyRepository:ref:refs/heads/deployment` in the Subject Identifier.

Finally

Give a descriptive name like production-env-auth-myapp and click the Add button.

> Step A would have been sufficient for us, but since we will also manually tag the Production Image as Live through the GitHub workflow, we will create the branch with step B and perform this operation through it as well.

### 6. Dockerfile Configuration

To run our Next.js application on Azure, we need to package the project into an image. The following Dockerfile minimizes image size and enhances security using the Multi-Stage Build method.

```dockerfile
FROM node:20.17.0-alpine AS builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --production --ignore-scripts --prefer-offline

FROM node:20.17.0-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 8080
CMD ["yarn", "start"]
```

> Create the Dockerfile in the same directory as .env and add the content above. (Update the variables according to your own project)

**Why Do We Use This Structure?**

- **Lightweight Image (Alpine):** By using alpine as the base image, we occupy minimum space on the server.
- **Multi-Stage Build:** We don't include unnecessary files used during compilation (source code, development packages, etc.) in the final image. We improve performance by only taking the .next, public, and node_modules folders.
- **Security and Speed:** With the yarn install --production command, we only keep packages needed at runtime, thus reducing security vulnerabilities and shortening the application startup time.

**Important Reminder:** Since Azure Web App listens on port 8080 by default, using EXPOSE 8080 and running the application on this port is critically important for compatibility.

### 7. GitHub Actions Workflow (.yml) Configuration

We are creating our .github/workflows/deploy.yml file that ties the entire process together. This workflow is the main orchestrator that manages all stages from building the code to pushing it to ACR and deploying it to the relevant slots on Azure.

```yaml
name: Build & Deploy (Smart Versioning)

on:
  push:
    branches:
      - production
      - test
  workflow_dispatch: # Manuel tetikleme için

permissions:
  id-token: write
  contents: read

jobs:
  # --- 1. JOB: BUILD (Push gelince çalışır) ---
  build:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/production' && 'Production' || 'Test' }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANT_ID }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTION_ID }}

      - name: Login to Azure Container Registry
        run: az acr login --name ${{ secrets.ACR_LOGIN_SERVER }}

      - name: Create .env file
        run: |
          cat <<EOF > .env
          NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${{ secrets.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
          NEXT_PUBLIC_GOOGLE_MAP_ID=${{ secrets.NEXT_PUBLIC_GOOGLE_MAP_ID }}
          EOF

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          provenance: false
          sbom: false
          file: ./Dockerfile
          tags: ${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:${{ github.ref_name }}-${{ github.sha }}

      - name: Clean up old images (Keep last 3)
        run: |
          KEEP=1

          if [ "${{ github.ref_name }}" == "production" ]; then
            KEEP=3
          fi

          echo "Branch: ${{ github.ref_name }} | Keeping last $KEEP images."

          az acr repository show-manifests \
            --name ${{ secrets.ACR_LOGIN_SERVER }} \
            --repository ${{ secrets.ACR_REPO_NAME }} \
            --orderby time_desc \
            --query "[?tags[?contains(@, '${{ github.ref_name }}-')]].digest" \
            -o tsv | awk "NR>$KEEP" | xargs -I% az acr repository delete --name ${{ secrets.ACR_LOGIN_SERVER }} --image ${{ secrets.ACR_REPO_NAME }}@% --yes || true

  # --- 2. JOB: DEPLOY (Build bitince çalışır) ---
  deploy:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    needs: build
    environment: ${{ github.ref == 'refs/heads/production' && 'Production' || 'Test' }}

    steps:
      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANT_ID }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTION_ID }}

      - name: Deploy to Azure Web App (Staging/Test Slot)
        run: |
          SLOT_PARAM=""
          if [ "${{ github.ref_name }}" == "production" ]; then
            SLOT_PARAM="--slot staging"
          elif [ "${{ github.ref_name }}" == "test" ]; then
            SLOT_PARAM="--slot test"
          else
            exit 1
          fi

          DOCKER_IMAGE_TAG="${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:${{ github.ref_name }}-${{ github.sha }}"

          az webapp config set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM \
            --generic-configurations '{"acrUseManagedIdentityCreds": true}' \
            --always-on true

          az webapp config appsettings set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM \
            --settings WEBSITES_PORT=8080 DOCKER_CUSTOM_IMAGE_NAME="$DOCKER_IMAGE_TAG"

          az webapp config container set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM \
            --docker-custom-image-name "$DOCKER_IMAGE_TAG" \
            --docker-registry-server-url "https://${{ secrets.ACR_LOGIN_SERVER }}"

      - name: Restart Slot
        run: |
          SLOT_PARAM=""
          if [ "${{ github.ref_name }}" == "production" ]; then
            SLOT_PARAM="--slot staging"
          elif [ "${{ github.ref_name }}" == "test" ]; then
            SLOT_PARAM="--slot test"
          fi

          az webapp restart --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            $SLOT_PARAM

  # --- 3. JOB: PROMOTE TO LIVE (Sadece Butonla Çalışır) ---
  promote-to-live:
    if: github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    steps:
      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZUREAPPSERVICE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZUREAPPSERVICE_TENANT_ID }}
          subscription-id: ${{ secrets.AZUREAPPSERVICE_SUBSCRIPTION_ID }}

      - name: Tag and Seal Image as 'live'
        run: |
          CURRENT_IMAGE=$(az webapp config appsettings list \
            --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            --query "[?name=='DOCKER_CUSTOM_IMAGE_NAME'].value" -o tsv)

          echo "Production image being sealed: $CURRENT_IMAGE"

          az acr import \
            --name ${{ secrets.ACR_LOGIN_SERVER }} \
            --source $CURRENT_IMAGE \
            --image ${{ secrets.ACR_REPO_NAME }}:live \
            --force

          az webapp config container set \
            --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            --docker-custom-image-name "${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:live"

          az webapp config appsettings set --name "${{ secrets.WEBAPP_NAME }}" \
            --resource-group "${{ secrets.WEBAPP_RESOURCE_GROUP }}" \
            --settings DOCKER_CUSTOM_IMAGE_NAME="${{ secrets.ACR_LOGIN_SERVER }}/${{ secrets.ACR_REPO_NAME }}:live"
```

**Core Capabilities of the Workflow:**

#### JOB: Build (Build and Register)

This stage runs only when code is pushed. Its purpose is to create the application's Docker image and securely upload it to ACR.

- **Azure & ACR Login:** Connects to Azure passwordlessly using OIDC (Workload Identity).
- **Dynamic .env Creation:** Injects the API keys stored in GitHub Secrets (such as NEXT_PUBLIC_API_URL) into the Docker image during the build phase.
- **Docker Build & Push:** Packages the application and sends it to ACR, tagging each image as branch-commit_id (e.g.: production-a1b2c3d).
- **Smart Cleanup:** To avoid unnecessary costs in ACR, it keeps only the last image in the test branch and the last 3 images in the production branch (for rollback purposes); it automatically deletes older ones.

#### 2. JOB: Deploy (Deployment)

This kicks in after the image is successfully built. It determines the target based on which branch the code came from.

- **Dynamic Slot Management:** If the code comes from the production branch, it is directed to the Staging slot; if from the test branch, to the Test slot.
- **Container Configuration:** Instructs the Azure Web App: "This is the new image address, pull it from ACR using Managed Identity."
- **Port and Settings Update:** Configures the WEBSITES_PORT=8080 setting required for the application to run and defines the new image.
- **Slot Restart:** Restarts the relevant slot for the settings to take effect and the new image to go live immediately.

#### 3. JOB: Promote to Live (Go Live and Seal)

This is the "smartest" part of the workflow. It only runs when manually triggered (via button).

- **Image Sealing (Live Tag):** Finds the image currently running in the Staging slot that has been confirmed as successful. It re-tags (imports) this image with the :live label within ACR.
- **Version Pinning:** Updates the Web App to point to this :live tagged image.
- **Security:** This operation is restricted to run only from the production branch; thus, the possibility of accidentally pushing test-stage code to production is technically prevented.

> **Result:** Thanks to this structure, when you push your code, it is first placed in a secure "waiting room" (Staging/Test), and your live environment (Production) remains protected until you give manual approval.

### 8. First Deployment (Push) and Deployment Center Configuration

Now that the infrastructure is ready, we can start the process by pushing our code. While the process is automated for Test and Staging slots, a one-time manual synchronization is required for the Production (Live) environment. The fundamental reason for this is the requirement for both slots to be accessible and have compatible settings for a safe Swap operation.

#### A. Deployment Center Settings

Follow the steps below to specify which container image your web application will use:

- Access: Azure Portal > Web App > Deployment Center.
- Source: Container Registry.
- Container Type: Single Container.
- Image Source: Azure Container Registry (ACR).
- Subscription & Registry: Select your Azure subscription and the ACR name you created.
- Image & Tag: Select the test or production tag based on your branch structure (e.g.: production-commitsha).
- Completion: Save the settings by clicking "Finish".

#### B. Environment Variables and Synchronization

The .env data must be defined on the Azure side for your application to work properly:

- Configuration: Go to the Web App > Configuration > Application Settings tab.
- Copy Strategy: Manually copy the successful settings from the Staging slot to the Production slot.
- Why Manual? We need to ensure that both slots have the same environment variables for the system to work stably during the first Swap operation. Once this is done, subsequent updates will be performed automatically through GitHub Actions.

#### C. Automatic Deployment Flow

After the configuration is complete, the system will work as follows:

- **Test Branch:** Push operations to this branch are deployed directly to the Test Slot. However, there is a small but critically important detail for the process to proceed smoothly, which we will address shortly.
- **Production/Deployment Branch:** Push operations to this branch are deployed to the Staging Slot. After successful testing, you can transfer the new version from Staging to Production (Live) within seconds using the "Swap" button.

> The greatest advantage offered by the Swap mechanism is the ability to instantly Rollback to the previous version with a single click when an unexpected error is encountered in the live environment (Production). This way, you can release new updates with minimum risk and prevent system outages.

### 9. Advanced Security and Swap Configuration

We have set up our system, but we need to make some critical "fine adjustments" to ensure the staging environment is closed to the outside world and swap operations are performed without errors.

#### A. Microsoft Authentication for the Staging Environment

Adding Microsoft Authentication is critical from a security perspective to ensure that only authorized people can access the staging environment (myapp-staging.azurewebsites.net):

- **Configuration:** Add the "Microsoft" provider from the Web App > Authentication tab.
- **Variables:** As a result of this operation, variables such as MICROSOFT_PROVIDER_AUTHENTICATION_SECRET and WEBSITE_AUTH_AAD_ALLOWED_TENANTS will be automatically created.
- **Slot Setting:** Make sure to check the "Deployment slot setting" checkbox next to these variables (set to true). This way, these settings will remain "pinned" to the staging slot; even if you perform a swap, they won't be transferred to the live environment (Production), preventing an unexpected login screen from appearing on your live site.

#### B. Warm-up and Status Codes for Safe Swap

When we add authentication to the staging environment, Azure may encounter a redirect or 401 (Unauthorized) error when checking the site during the swap process (warm-up). To prevent this from causing the swap to fail, we need to make the following setting:

- **Variable:** `WEBSITE_SWAP_WARMUP_PING_STATUSES`
- **Value:** `200,301,302,401`
- **Purpose:** Ensures that Azure considers the redirect or authentication codes it receives when trying to access the staging slot as "successful." If this variable is not defined, the swap operation will fail with an error due to the login screen.

#### C. "Safety Lock" Against Erroneous Swap Operations

We are adding a warning mechanism to prevent accidentally swapping the wrong slot (e.g., the Test slot) to production while working between Test, Staging, and Production slots:

- **Test Slot Setting:** Add a variable named something like `CAUTION_THIS_IS_TEST_SLOT_DO_NOT_SWAP` to your Test slot's configuration and set its value to true.
- **Critical Note:** Also activate the "Deployment slot setting" option for this variable. This way, when you see this warning on the swap screen, you will have minimized the risk of performing an incorrect operation.

### Result: Fully Automated Flow

When all these settings are complete, your workflow will become seamless as follows:

- **Test Branch:** When pushed, it goes directly to the Test Slot.
- **Production Branch:** When pushed, it first goes to the Staging Slot.
- **Swap:** After performing final checks on Staging, Swap is manually initiated and the application transitions to production (Live) seamlessly within seconds.
- **Tagging:** After the Swap, you can complete your version tracking by tagging the last successful image as "Live" through GitHub.

### Summary: Architectural Flow and Critical Checklist

You can manage the lifecycle of your Next.js application on Azure within the framework of the following fundamental rules:

- **Automatic Deployment Logic:** Push operations to the production branch are directed to the Staging Slot. Push operations to the test branch are deployed to an isolated environment, the Test Slot.
- **Initial Setup Requirement:** Before the first swap operation, you need to manually copy the configuration settings from the Staging slot to the Production slot. This is a one-time operation; subsequent processes will proceed automatically.
- **Erroneous Operation Protection:** Add the `CAUTION_THIS_IS_TEST_SLOT_DO_NOT_SWAP` variable to the Test slot and mark it as Deployment slot setting: true. This is a visual security barrier against the risk of accidentally pushing the test environment to production.
- **Slot Security (Optional):** Adding Microsoft Authentication is recommended to prevent unauthorized access to the Staging or Test environment. Set the Deployment slot setting of the variables created by this operation to true to ensure that the live environment (Production) is not affected by this restriction.
- **Swap Solution:** To prevent the swap operation from failing when authentication is active, assign the values `200,301,302,401` to the `WEBSITE_SWAP_WARMUP_PING_STATUSES` variable. This ensures that Azure considers login screen redirects as "healthy."
- **Storage and Rollback Strategy:** To prevent unnecessary cost and complexity on the Container Registry, we keep Test images clean and store the last 3 images for Production. By tagging the most current image as live, we guarantee the ability to quickly Rollback to one of the previous 3 versions in case of a potential crisis.

---

Today, we explored step by step how to Dockerize our Next.js applications and move them to a fully automated CI/CD pipeline with Azure and GitHub Actions. Together, we have built a secure and scalable structure offered by modern cloud architecture. Thank you for taking the time to read!
