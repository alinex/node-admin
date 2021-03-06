# Introduction

The administration panel is an easy and fast way to manage IT systems for technical and non technical staff.

It is a universal control interface which can become real powerful by adding modules for special tasks. This modules will interact with the real systems in a proper and safe way. The user has no direct control but the limited functionality like defined in the module.

![Architecture](architecture.svg)

The two main parts of the administration panel are the __client__ which is loaded on the user's control device and the __REST__ server which works as the gateway to the resources like server machines.

## Features

__Client__
- universal: web application, desktop and mobile app
- intiutive and simple interface
- fast and easy to use
- modular structure
- realtime communication

__Server__
- stateless using simple Java Web Token for authentication
- websocket (Realtime API) or HTTP REST
- service oriented architecture
- authorization
- server validation
- detailed request, error and module logging
- multiple database support

__Modules__
- user and rights management
- chat application

## Showcase

Some example screenshots from the server:

![Server Start](demo/server.start.png)
![API Docs](demo/swagger.png)
![Logfiles](demo/logtail.png)

And from the client, coming soon...

![Client Start](demo/client.start.png)
![Client Login](demo/client.login.png)

## Demo

Check out the demo on a small shared host: [demo.alinex.de](https://demo.alinex.de).
(Use the displayed placeholder text to login.)
