{
  "targets": [
    {
      "target_name": "<(module_name)",
      "sources": [ "src/addons/graphix.cpp", "src/addons/hello.cpp" ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'product_dir': '<(module_path)',
      "xcode_settings": {
        "MACOSX_DEPLOYMENT_TARGET":"10.9"
      }
    }
  ]
}