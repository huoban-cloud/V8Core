

// V8Core.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//
#include "pch.h"

#include <Windows.h>
#include <libplatform/libplatform.h>
#include <v8.h>


v8::StartupData* snapshot_blob = nullptr;
std::unique_ptr<v8::Platform> platform;



const char* print_js_exception(v8::Isolate* isolate, v8::TryCatch* try_catch, int& err_length)
{
    err_length = 0;
    std::string result("");
    v8::String::Utf8Value exception_string(isolate, try_catch->Exception()->ToString(isolate->GetCurrentContext()).ToLocalChecked());

    v8::Local<v8::Message> message = try_catch->Message();
    if (message.IsEmpty()) {
        // V8 didn't provide any extra information about this error; just
        // print the exception.
        result.append(*exception_string);
        result.append("\n");
    }
    else {
        // Print (filename):(line number): (message).
        v8::String::Utf8Value filename(isolate,
            message->GetScriptOrigin().ResourceName());
        v8::Local<v8::Context> context(isolate->GetCurrentContext());
        const char* filename_string = *filename;
        int linenum = message->GetLineNumber(context).FromJust();

        result.append(*exception_string);
        result.append("\n");

        // Print line of source code.
        v8::String::Utf8Value sourceline(
            isolate, message->GetSourceLine(context).ToLocalChecked());
        const char* sourceline_string = *sourceline;

        result.append(sourceline_string);
        result.append("\n");

        // Print wavy underline (GetUnderline is deprecated).
        int start = message->GetStartColumn(context).FromJust();
        for (int i = 0; i < start; i++) {
            fprintf(stderr, " ");
        }
        int end = message->GetEndColumn(context).FromJust();
        for (int i = start; i < end; i++) {
            result.append("^");
        }
        result.append("\n");
        v8::Local<v8::Value> stack_trace_string;
        if (try_catch->StackTrace(context).ToLocal(&stack_trace_string) &&
            stack_trace_string->IsString() &&
            v8::Local<v8::String>::Cast(stack_trace_string)->Length() > 0) {
            v8::String::Utf8Value stack_trace(isolate, stack_trace_string);
            const char* stack_trace_string = *stack_trace;
            result.append(stack_trace_string);
            result.append("\n");
        }
    }

    if (result.length() > 0)
    {
        err_length = result.length();
        const char* err = (const char*)new char[err_length + 1];
        if (err != 0) {
            std::memset((void*)err, 0, err_length + 1);
            std::memmove((void*)err, result.c_str(), err_length);
        }
        return err;
    }
    else
    {
        return nullptr;
    }

}


EXTERN_C
__declspec(dllexport)
void
WINAPI
v8_init()
{
    platform = v8::platform::NewDefaultPlatform();
    v8::V8::InitializePlatform(platform.get());
    v8::V8::Initialize();
    return;
}

EXTERN_C
__declspec(dllexport)
void
WINAPI
v8_uninit()
{
    v8::V8::ShutdownPlatform();
    platform.release();
}

EXTERN_C
__declspec(dllexport)
v8::Isolate*
WINAPI
v8_new_isolate()
{
    v8::Isolate::CreateParams create_params;
    create_params.array_buffer_allocator =
        v8::ArrayBuffer::Allocator::NewDefaultAllocator();
    v8::Isolate* isolate = v8::Isolate::New(create_params);
    return isolate;
}

EXTERN_C
__declspec(dllexport)
void
WINAPI
v8_free_isolate(v8::Isolate* isolate)
{
    isolate->Dispose();
}


EXTERN_C
__declspec(dllexport)
v8::Global<v8::Context>*
WINAPI
v8_new_context(v8::Isolate* isolate)
{
    v8::Locker locker(isolate);
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scoape(isolate);
    v8::Local<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);
    v8::Local<v8::Context> local_context = v8::Context::New(isolate, 0, global);
    v8::Global<v8::Context>* global_context = new v8::Global<v8::Context>(isolate, local_context);
    global_context->SetWeak();
    return global_context;
}

EXTERN_C
__declspec(dllexport)
void
WINAPI
v8_free_context(v8::Isolate* isolate, v8::Global<v8::Context>* context)
{
    v8::Locker locker(isolate);
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scoape(isolate);
    context->ClearWeak();
    context->Reset();
}


EXTERN_C
__declspec(dllexport)
bool
WINAPI
v8_eval(v8::Isolate* isolate, v8::Global<v8::Context>* context, const char* code, int code_length, const char*& output, int& output_length, const char*& err, int& err_length)
{
    v8::Locker locker(isolate);
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scoape(isolate);
    v8::Local<v8::Context> local_context = v8::Local<v8::Context>::New(isolate, *context);
    v8::Context::Scope scope(local_context);
    v8::TryCatch try_catch(isolate);

    output = nullptr;
    output_length = 0;
    err = nullptr;
    err_length = 0;

    v8::Local<v8::String> _code = v8::String::NewFromUtf8(isolate, code, v8::NewStringType::kNormal, code_length).ToLocalChecked();
    v8::MaybeLocal<v8::Script> script = v8::Script::Compile(local_context, _code);

    if (!script.IsEmpty())
    {
        v8::MaybeLocal<v8::Value> result = script.ToLocalChecked()->Run(local_context);
        if (!result.IsEmpty())
        {
            v8::String::Utf8Value result_string(isolate, result.ToLocalChecked()->ToString(local_context).ToLocalChecked());
            output_length = result_string.length();
            if (output_length > 0)
            {
                output = (const char*)malloc(output_length + 1);
                std::memset((void*)output, 0, output_length + 1);
                std::memmove((void*)output, *result_string, result_string.length());
            }
            return true;
        }
    }

    err = print_js_exception(isolate, &try_catch, err_length);
    return false;
}


EXTERN_C
__declspec(dllexport)
void
WINAPI
v8_free_mem(const char* ptr)
{
    if (ptr != nullptr)
    {
        free((void*)ptr);
    }
}