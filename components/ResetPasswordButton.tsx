'use client';

import { resetStudentPassword } from "@/app/actions/student";
import { useState, useTransition } from "react";

export default function ResetPasswordButton({ studentId }: { studentId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleReset = () => {
        if (!confirm("Are you sure you want to reset the password to default (9999999999)?")) return;

        startTransition(async () => {
            try {
                await resetStudentPassword(studentId);
                alert("Password has been reset successfully to 9999999999");
            } catch (error) {
                alert("Failed to reset password. Check console/logs.");
                console.error(error);
            }
        });
    };

    return (
        <button 
            onClick={handleReset}
            disabled={isPending}
            type="button"
            className="text-sm bg-gray-100 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 disabled:opacity-50"
        >
            {isPending ? "Resetting..." : "Reset Password"}
        </button>
    );
}
