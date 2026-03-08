## HTTP, HTTPS, SSL/TLS, SSH

### Web and HTTP

Until the early 1990s, the Internet was primarily used by researchers, academics, and university students. It was used for logging into remote hosts, transferring files from local hosts to remote hosts and vice versa, sending and receiving news, and sending and receiving electronic mail. That was until the WWW (World Wide Web) emerged. The Web was the first Internet application to capture the public's attention. It significantly changed how people interact within and outside their work environments and continues to do so. Perhaps what appeals most to users is that the Web works on demand. Users get what they want whenever they want it. This is the exact opposite of TV and Radio broadcasts. The Web has turned everyone into a publisher. Search engines have enabled us to navigate the web ocean. Forms, JavaScript, Java applications, and many other tools allow us to interact with pages and sites. And Web protocols serve as a platform for YouTube, Web-based email (like Gmail), and most mobile Internet applications, such as Instagram and Google Maps.

### HTTP Overview

Hyper Text Transfer Protocol (HTTP) is a protocol that operates at the application layer of the web using port 80. We can call it the heart of the Web. HTTP is implemented in two programs: the client program and the server program. The Server and Client communicate by exchanging HTTP messages through end systems. The structure of these messages is defined by HTTP. Before diving into the details of HTTP, let's examine some web terminology. A Web page (also called a document) consists of objects. An object is simply a file—such as HTML, JPEG, video-clip, etc.—that is addressable by a single URL.

Mostly, a web page consists of a base HTML file and many different objects. For example, if a Web page has 1 HTML file and 5 JPEG files, there are a total of 6 objects on this web page. The base HTML file references other objects on the page using their URLs. Each URL has two components: hostname and pathname. For example: http://www.someSchool.edu/someDepartment/picture.gif In this URL, www.someSchool.edu is the hostname, and /someDepartment/picture.gif is the pathname. Web Browsers implement the Client side of HTTP, while Web Servers implement the Server side. HTTP defines how Web clients request Web pages from Web servers and how servers transfer Web pages to clients. When a Client makes a request (for example, by clicking a link), the Browser sends an HTTP Request message to the server for the objects on the page. When the Server receives the request message, it sends an HTTP Response message back to the browser.

HTTP uses TCP as its primary transport protocol. The HTTP client first initiates a TCP connection with the server. Once the connection is established, the browser and server processes access TCP through their socket interfaces. On the client side, the socket interface is the gate between the client process and the TCP connection; on the server side, it is the gate between the server process and the TCP connection. The Client sends HTTP request messages to the socket interface and receives HTTP response messages from the socket interface.

![HTTP Socket Interface](images/blog/1/1.png)

Similarly, the HTTP server receives request messages from the socket interface and sends response messages to the socket interface. Once the client sends a message to the socket interface, the message is out of the client's hands and in the hands of TCP. TCP provides a reliable data transfer service to HTTP. This means that every HTTP request message sent by a client process eventually reaches the server intact; similarly, every HTTP response message sent by the server process eventually reaches the client in full. Here we see a major advantage of layered architecture. HTTP does not deal with data loss; this task is handled by TCP.

### HTTP Message Formats

There are two different message formats: Response message and Request message.

![HTTP Message Formats](images/blog/1/2.png)

*HTTP Request Message Structure*

First, we see that the message is written in ordinary ASCII text; even an average computer user can read it. Second, we see that the message consists of five lines, each followed by a carriage return and a line feed. This request message consists of 5 lines, but it can consist of more.

The first line of an HTTP request message is called the request line. The subsequent lines are called Header Lines. The request line consists of 3 fields: the Method field, the URL field, and the HTTP version field.

The method field can take values such as GET, POST, PUT, DELETE, and HEAD. The most commonly used are GET and POST. GET is used when a browser requests an object.

- PUT: Used to update a resource on the server. These requests also usually carry the information intended to be changed.
- PATCH: This method is also used to modify a resource on the server. The difference from Put is that Put is used to replace the resource on the server with a new one, while Patch is used to change a part of that resource.
- DELETE: Used to delete a resource on the server.

Less commonly used methods are as follows:

- CONNECT: Sends a request to establish a connection with the server. It allows testing server connections with minimum load.
- HEAD: Sends a request to the server just like the Get method, but it only has a header (Request Header) and no body (Request Body). It is usually used to check if a resource exists on the server or for the resource's latest update information.
- OPTIONS: Used to check which methods the server supports.
- TRACE: When you send a request to a server with this method, all intermediate proxy servers (Proxy, Gateway) add their own IP or DNS information to the request header. It is generally used for debugging/maintenance tasks.

In the example request above, the requested object is /somedir/page.html. In this example, the browser is using HTTP/1.1 version.

**Header lines;**

- Host: www.someschool.edu: Specifies the host where the object is located.
- Connection: close: The browser is telling the server it does not want to deal with persistent connections; it wants the server to close the connection after sending the requested object.
- User-Agent: Specifies the type of Browser making the request to the server. Here, the user-agent is Mozilla/5.0, which is a Firefox browser. This Header line is useful because the server can actually send different versions of the same object to different types of user-agents.
- Accept-language: The header indicates that if such an object exists on the server, the user prefers to receive a French version of the object; otherwise, the server should send its default version.

After examining the example above, let's look at the general format of an HTTP request.

However, after the header lines (and the additional carriage return and line feed), there is an "entity body." The entity body is empty with the GET method but is used with the POST method. An HTTP client typically uses the POST method when a user fills out a form (for example, when a user types search terms into a search engine). With a POST message, the user is still requesting a Web page on a server. However, the specific content of the Web page depends on what the user entered in the form fields. If the method value is POST, the entity body contains the values entered by the user.

![HTTP POST Method](images/blog/1/3.png)

HTML forms usually use the GET method and include the entered data (in the form fields) in the requested URL. For example, if a form uses the GET method, has two fields, and the entries for the two fields are "monkeys" and "bananas," the URL will have a structure like: www.somesite.com/animalsearch?monkeys&bananas.

Now let's examine the HTTP Response message.

![HTTP Response Message](images/blog/1/4.png)

In the status line, we see 3 different sections. We see 6 Header lines and finally the entity body. There are three fields in the status line: the protocol version field, the status code, and the corresponding status message.

In this example, the status line indicates that the server is using HTTP/1.1 and that everything is okay (meaning the server found and sent the requested object).

**Let's take a look at the Header lines.**

- Connection: close: The server is telling the client that it will close the TCP connection after sending the message.
- Date: Indicates the time and date when the HTTP response was created and sent by the server. Note that this is not the time the object was created or last modified; it is the time the server retrieved the object from the file system, attached it to the response message, and sent the response message.
- The Server: Indicates that the message was generated by an Apache Web server; similar to the User-agent header line in the HTTP request message.
- Last-Modified: This header is critical for object caching, both on local clients and network cache servers (also known as proxy servers).
- Content-Length: The header line indicates the number of bytes in the sent object.
- Content-Type: The header line indicates that the object in the entity body is HTML text.

### HTTP Status Codes

- 1xx Informational
- 2xx Success
- 3xx Redirection
- 4xx Client Error
- 5xx Server Error. xx here represents numbers between 00–99.

The most commonly encountered codes are as follows.

- HTTP Status Code 200 — OK.
- HTTP Status Code 301 — Permanent Redirect.
- HTTP Status Code 302 — Temporary Redirect.
- HTTP Status Code 404 — Not Found.
- HTTP Status Code 410 — Gone.
- HTTP Status Code 500 — Internal Server Error.
- HTTP Status Code 503 — Service Unavailable.

### HTTPS

Hypertext Transfer Protocol Secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website. HTTPS is encrypted to increase the security of data transfer. This is especially important when users transmit sensitive data, such as logging into a bank account, email service, or health insurance provider.

Any website, especially those requiring login credentials, should use HTTPS. In modern web browsers like Chrome, websites that do not use HTTPS are marked differently from others. Look for a green padlock in the URL bar to indicate that the web page is secure. Web browsers take HTTPS seriously; Google Chrome and other browsers mark all non-HTTPS websites as not secure.

![HTTPS Not Secure Warning](images/blog/1/5.png)

#### How does HTTPS work?

HTTPS uses an encryption protocol to encrypt communications. Although previously known as Secure Sockets Layer (SSL), the protocol is now called Transport Layer Security (TLS). This protocol secures communication using what is known as an asymmetric public key infrastructure. This type of security system uses two different keys to encrypt communication between two parties:

- **Private Key** — This key is controlled by the owner of a website and is kept private, as the reader might guess. This key resides on a web server and is used to decrypt information encrypted by the public key.
- **Public key** — This key is available to anyone who wants to interact with the server securely. Information encrypted by the public key can only be decrypted by the private key.

### What is SSL?

SSL, or Secure Sockets Layer, is an encryption-based Internet security protocol operating on port 443. It was originally developed by Netscape in 1995 to ensure privacy, authentication, and data integrity in Internet communications. SSL is the predecessor to the modern TLS encryption used today. A website that implements SSL/TLS has "HTTPS" in its URL instead of "HTTP."

![HTTPS URL](images/blog/1/6.png)

#### How does SSL/TLS work?

To provide a high degree of privacy, SSL encrypts data transmitted over the web. This means that anyone trying to intercept this data will only see a scrambled mix of characters that is nearly impossible to decrypt.
SSL initiates an authentication process called a handshake between two communicating devices to ensure that both devices are truly who they claim to be.
SSL also digitally signs data to provide data integrity, verifying that the data has not been tampered with before reaching its intended recipient.
There have been several iterations of SSL, each more secure than the last. In 1999, SSL was updated to become TLS.

#### Are SSL and TLS the same?

SSL is the direct predecessor to another protocol called TLS (Transport Layer Security). In 1999, the Internet Engineering Task Force (IETF) proposed an update to SSL. Since this update was developed by the IETF and Netscape was no longer involved, the name was changed to TLS. The differences between the final version of SSL (3.0) and the first version of TLS are not very large; the name change was applied to signify the change in ownership.

Because they are so closely related, the two terms are often used interchangeably and confused. Some people still use SSL to refer to TLS, while others use the term "SSL/TLS encryption" because SSL still has a lot of brand recognition.

#### What is an SSL Certificate?

SSL can only be implemented by websites that have an SSL certificate (technically a "TLS certificate"). An SSL certificate is like an ID card or a badge proving that someone is who they say they are. SSL certificates are stored and displayed on the Web by a website's or application's server.

One of the most important pieces of information in an SSL certificate is the website's public key. The public key makes encryption possible. A user's device views the public key and uses it to establish secure encryption keys with the web server. Meanwhile, the web server also has a private key that is kept secret; the private key decrypts data encrypted with the public key.

Certificate Authorities (CA) are responsible for issuing SSL certificates.

#### What are the types of SSL Certificates?

There are several different types of SSL certificates. A certificate can be applied to a single website or several websites, depending on its type:

- **Single-Domain:** An SSL certificate is valid for only one domain ("domain" is the name of a website, such as www.cloudflare.com).
- **Wildcard:** An SSL certificate is valid for only one domain, but it also includes the subdomains of that domain. For example, a wildcard certificate could cover www.cloudflare.com, blog.cloudflare.com, and developers.cloudflare.com, whereas a single-domain certificate could only cover the first one.
- **Multi-Domain:** As the name suggests, multi-domain SSL certificates can be applied to multiple unrelated domain names.

SSL certificates also come with different validation levels. The validation level is like a background check, and the level varies depending on the thoroughness of the check.

- **Domain Validation:** This is the lowest level of validation and the cheapest. All a business needs to do is prove that they control the domain.
- **Organization Validation:** This is a more hands-on process: the CA contacts the person or business requesting the certificate directly. These certificates are more trustworthy for users.
- **Extended Validation:** This requires a full background check of an organization before an SSL certificate is issued.

### SSH

SSH, also known as Secure Shell or Secure Socket Shell, is a network protocol that provides users, especially system administrators, with a secure way to access a computer over an insecure network.

SSH also refers to the suite of utilities that implement the SSH protocol. Secure Shell provides strong password authentication and public key authentication, as well as encrypted data communications between two computers connecting over an open network like the internet.

In addition to providing strong encryption, SSH is widely used by network administrators to manage systems and applications remotely, allowing them to log in to another computer over a network, execute commands, and move files from one computer to another.

An SSH server, by default, listens on the standard Transmission Control Protocol (TCP) port 22.

#### How does SSH work?

Secure Shell was created to replace insecure terminal emulation or login programs such as Telnet, rlogin (remote login), and rsh (remote shell). SSH enables the same functions—logging into remote systems and running terminal sessions. SSH also replaces file transfer programs such as File Transfer Protocol (FTP) and rcp (remote copy).

The most basic use of SSH is to connect to a remote host for a terminal session. The command is as follows:

```
ssh UserName@SSHserver.example.com
```

This command causes the client to attempt to connect to the server named server.example.com using the user ID UserName. If a connection is being established between the local host and the server for the first time, the user is asked for public key fingerprint permission for the remote host.

```
The authenticity of host 'sample.ssh.com' cannot be established.
 DSA key fingerprint is 01:23:45:67:89:ab:cd:ef:ff:fe:dc:ba:98:76:54:32:10.
 Are you sure you want to continue connecting (yes/no)?
```

Responding "yes" to the prompt allows the session to continue, and the host key is stored in the local system's known_hosts file. This is a hidden file stored in a hidden directory named /.ssh/known_hosts in the user's home directory by default. Once the host key is stored in the known_hosts file, the client system can reconnect directly to that server without any confirmation required; the host key verifies the connection identity.

#### SSH vs. SSL/TLS

The Transport Layer Security (TLS) protocol—the current version of the Secure Sockets Layer (SSL) protocol—is designed to provide security for network transfers at the transport layer. The SSH protocol also operates at the transport layer or just above it, but there are important differences between the two protocols.

While both rely on public/private key pairs to authenticate hosts, under TLS, only the server's identity is authenticated with a key pair. SSH uses a separate key pair to authenticate each connection: one key pair for the connection from the local machine to the remote machine and a second key pair to authenticate the connection from the remote machine to the local machine.

Another difference between SSH and TLS is that TLS allows connections to be encrypted without authentication or authentication to be performed without encryption. SSH encrypts and authenticates all connections.

SSH provides IT and information security (infosec) professionals with a secure mechanism for managing SSH clients remotely. Instead of requiring password authentication to initiate a connection between an SSH client and server, SSH authenticates the devices. This allows IT personnel to establish connections with remote systems and change SSH configurations, including adding or removing host key pairs in the known_hosts file.

#### Sources

#### Book

- Computer Networking: A Top-Down Approach (7th Edition) — Kurose & Ross

#### Web Resources

- [Cloudflare - What is HTTPS?](https://www.cloudflare.com/learning/ssl/what-is-https/)
- [Cloudflare - What is SSL?](https://www.cloudflare.com/learning/ssl/what-is-ssl/)
- [TechTarget - Secure Shell](https://www.techtarget.com/searchsecurity/definition/Secure-Shell)

`HTTPS` `HTTP Request` `SSH` `SSL` `TLS`
