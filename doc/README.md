# Introduction

The administration panel should be an easy and fast way to manage IT systems for technical and non technical staff.

It is a universal control interface which can become real powerful by adding modules for special tasks. This modules will interact with the real systems in a proper and safe way. The user has no direct control but the limited functionality like defined in the module.

![Architecture](architecture.svg)

The two main parts of the administration panel are the __client__ which is loaded on the user's control device and the __REST__ server which works as the gateway to the resources like server machines.

## Features

__Client__
- universal: web application, desktop and mobile app
- intuitive and simple interface

__Server__
- stateless using simple Java Web Token for authentication
- websocket (Realtime API) or HTTP REST
- service oriented architecture
- multiple database support
- server validation
- detailed request, error and module logging

__Modules__
- user management
- chat application
