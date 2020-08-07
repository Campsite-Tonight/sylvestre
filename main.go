package main

import (	
// "bytes"	
// "encoding/json"	
// "io/ioutil"	
"log"	
"net/http"	
// "net/http/httputil"	
// "net/url"	
"os"	
// "strings"
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value;
	}
	return fallback;
}

func getListenAddress() string {
	port := getEnv("PORT", "1338")
	return ":" + port
}

func logSetup() {
	aConditionURL := os.Getenv("A_CONDITION_URL")
	bConditionURL := os.Getenv("B_CONDITION_URL")
	defaultConditionURL := os.Getenv("DEFAULT_CONDITION_URL")

	log.Printf("server will run on : %s\n", getListenAddress())
	log.Printf("redirecting to a url : %s\n", aConditionURL)
	log.Printf("redirecting to b url: %s\n", bConditionURL)
	log.Printf("redirecting to default url : %s\n", defaultConditionURL)
}

func handleRequestAndRedirect(res http.ResponseWriter, req *http.Request) {

}

func main() {
	logSetup()

	http.HandleFunc("/", handleRequestAndRedirect)
	if err := http.ListenAndServe(getListenAddress(), nil) ; err != nil {
		panic(err)
	}
}