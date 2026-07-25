import { NextResponse } from "next/server";

// Matches the standard envelope defined in API_REFERENCE.md §1/§9:
// success -> { success: true, data }
// error   -> { success: false, message }
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

// Generic fallback for unexpected errors — never leak internals (CLAUDE.md:
// "Never expose internal errors to users").
export function apiServerError() {
  return apiError("Something went wrong. Please try again.", 500);
}
