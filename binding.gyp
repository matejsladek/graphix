{
  "targets": [
    {
      "target_name": "<(module_name)",
      "sources": [ "src/addons/graphix.cpp", "src/addons/hello.cpp", "src/addons/dijkstra.cpp" ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")", "src/addons/"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'product_dir': '<(module_path)',
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.9',
      },
      'msvs_settings': {
         'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      },
    }
  ]
}