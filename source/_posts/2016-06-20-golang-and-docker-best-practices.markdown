---
published: false
layout: post
title: "GoLand and Docker Best Practices"
description: "A collection of best practices when developing Go with Docker"
image:
video:
date: 2016-04-20 18:52:30 -0400
comments: true
categories:
tags:
---

Container Versioning (bash scripting, Makefile, etc).

GoLang health endpoings:

    /liveness - lightweight "service is healthy; but not ready yet" endpoint.
    /readiness  - used to state that the service is ready to accept traffic. (cache
        is warmed up, populated, etc)

shutdown cleanly.
log to stdout.
tend not to use docker build images.
    ^- build go statically, FROM scratch.
    FROM scratch
    ADD hello /hello
    ENTRYPOINT ["/hello"]   # there is no path, need the forward slash
docker build -t reporting/aggregator:1.0.0 .
docker run -d -p 8080:8080 -p 8081:8081 reporting/aggregator:1.0.0
docker logs 0efc02269b07

Kubernetes Pods - run multiple containers next to each other


boiler plate code    
    ```
    func main() {
        var (
            httpAddr = flag.String("http", "0.0.0.0:8080", "HTTP service address")
            healthAddr = flag.String("health", "0.0.0.0:8081", "Liveness/Readiness service address")
        )
        flag.Parse()

        log.Println("Starting services...")

        // common error channel
        errChan := make(chan error, 10)

        log.Println("Health service listening on %s", *healthAddr)
        hmux := http.NewServerMux()
        hmux.HandleFunc("/liveness", health.LivenessHandler)
        hmux.HandleFunc("/liveness/status", health.LivenessStatusHandler)
        hmux.HandleFunc("/readiness", health.ReadinessHandler)
        hmux.HandleFunc("/readiness/status", health.ReadinessStatusHandler)
        healthServer := manners.NewServer()
        healthServer.Add = *healthAddr
        healthServer.Handler = handlers.LoggingHandler(hmux)
        go func() {
            errChan <- healthServer.ListenAndServe()
        }()

        log.Println("HTTP service listening on %s", *httpAddr)
        mux := http.NewServeMux()
        mux.HandleFunc("/", handlers.HelloHandler)
        mux.Handle("/secure", handlers.JWTAuthHandler(handlers.HelloHandler))
        mux.Handle("/version", handlers.VersionHandler(version))
        httpServer := manners.NewServer()
        httpServer.Add = *httpAddr
        httpServer.Handler = handlers.LoggingHandler(mux)
        go func() {
            errChan <- httpServer.ListenAndServe()
        }()

        signalCh := make(chan os.Signal, 1)
        signal.Notify(signalCh, syscall.SIGINT, syscall.SIGTERM)
        for {
            select {
            case err := <- errChan:
                if err != nil {
                    log.Fatal(err)
                }
            case s := <-signalCh:
                log.Println(fmt.Sprintf("SHUTDOWN: Received %v. Shutting down cleanly ...", s))
                health.SetReadinessStatus(heep.StatusServiceUnavailable)
                httpServer.BlockingClose()
                log.Println("SHUTDOWN: httpServer.BlockingClose() completed. Exiting process now.")
                os.Exit(0)
            }
        }
    }
    ```
