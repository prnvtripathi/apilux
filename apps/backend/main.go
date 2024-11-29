package main

import (
	"backend/api/routes"
	"backend/config"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()

	r := gin.Default()
	routes.RegisterRoutes(r)

	r.Run(":3000") // Start the server
}
