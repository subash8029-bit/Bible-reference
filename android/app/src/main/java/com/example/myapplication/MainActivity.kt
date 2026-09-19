package com.example.myapplication

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            var webViewInstance by remember { mutableStateOf<WebView?>(null) }

            BackHandler(enabled = webViewInstance?.canGoBack() == true) {
                webViewInstance?.goBack()
            }

            Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                AndroidView(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(innerPadding),
                    factory = { context ->
                        WebView(context).apply {
                            webViewClient = WebViewClient()
                            settings.javaScriptEnabled = true
                            settings.domStorageEnabled = true
                            settings.databaseEnabled = true
                            settings.allowFileAccess = true
                            settings.allowContentAccess = true
                            settings.cacheMode = WebSettings.LOAD_DEFAULT

                            val rootAssets = context.assets.list("")?.toList() ?: emptyList()
                            if (rootAssets.contains("index.html")) {
                                loadUrl("file:///android_asset/index.html")
                            } else {
                                loadUrl("file:///android_asset/dist/index.html")
                            }
                            webViewInstance = this
                        }
                    }
                )
            }
        }
    }
}
