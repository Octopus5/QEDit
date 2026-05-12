package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:wwwroot
var assets embed.FS

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title: "QEDit",
		// WindowPersistence nu există în Wails v2, așa că l-am eliminat pentru a repara eroarea de compilare.
		WindowStartState: options.Maximised,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
