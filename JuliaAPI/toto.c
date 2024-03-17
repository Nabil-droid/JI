#include <julia.h>

// Initialize Julia context
void init_julia() {
    jl_init();
}

// Run Julia commands
void run_julia_command(const char *command) {
    jl_eval_string(command);
}

// Notify Julia about program termination
void notify_julia_exit() {
    jl_atexit_hook(0);
}
