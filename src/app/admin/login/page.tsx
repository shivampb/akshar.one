"use client";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLoginSuccess = () => {
        localStorage.setItem("isAdminAuthenticated", "true");
        router.push("/admin");
    };

    return <AdminLogin onLogin={handleLoginSuccess} />;
}
