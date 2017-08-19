{
  "targets": [
    {
      "target_name": "<(module_name)",
      "sources": [ "hello.cc" ],
      'product_dir': '<(module_path)',
      "xcode_settings": {
        "MACOSX_DEPLOYMENT_TARGET":"10.9"
      }
    }
  ]
}