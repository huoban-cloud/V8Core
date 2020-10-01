#pragma once



#include <iostream>
#include <Windows.h>
#include <libplatform/libplatform.h>
#include <v8.h>


/*
#ifdef _DEBUG
#include "include/snapshot_blob_dbg.h"
#else
#include "include/snapshot_blob.h"
#endif // DEBUG

*/

v8::StartupData* snapshot_blob = nullptr;
v8::Isolate* isolate = nullptr;

std::unique_ptr<v8::Platform> platform;
v8::Isolate::CreateParams create_params;
