import { z } from "zod";
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Format email tidak valid.",
    }).min(2).max(50),
    password: z.string().min(8, {
        message: "Kata sandi harus minimal 8 karakter.",
    }).max(50, {
        message: "Kata sandi tidak boleh lebih dari 50 karakter."
    }),
});

export const RegisterSchema = z.object({
    name: z.string().min(2, {
        message: "Nama pengguna harus minimal 2 karakter.",
    }).max(30, {
        message: "Nama pengguna tidak boleh lebih dari 30 karakter."
    }),
    email: z.string().email({
        message: "Format email tidak valid.",
    }).min(2).max(50),
    password: z.string().min(8, {
        message: "Kata sandi harus minimal 8 karakter.",
    }).max(50, {
        message: "Kata sandi tidak boleh lebih dari 50 karakter."
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka."
    }),
    ConfirmPassword: z.string().min(8, {
        message: "Kata sandi harus minimal 8 karakter.",
    }).max(50, {
        message: "Kata sandi tidak boleh lebih dari 50 karakter."
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Kata sandi harus mengandung huruf besar, huruf kecil, dan angka."
    }),
}).refine(data => data.password === data.ConfirmPassword, {
    message: "Kata sandi tidak sama.",
    path: ["ConfirmPassword"],
});