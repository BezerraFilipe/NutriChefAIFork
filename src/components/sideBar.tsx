"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/card";
import { ScrollArea } from "@/components/scroll-area";
import { User } from "lucide-react";

export default function Sidebar() {
  const [history] = useState(["Receita 1", "Receita 2", "Receita 3"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data = await res.json();
        setUsername(data.name || "Usuário");
      } catch (error) {
        console.error("Erro ao carregar nome do usuário:", error);
        setUsername("Usuário");
      }
    }

    fetchUser();
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between px-4 py-6 shadow-sm">
      
      <div>
        <h1 className="text-2xl font-bold text-orange-600 mb-6">NutriChefAI</h1>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Minhas Receitas</h2>
        
        <ScrollArea className="h-[65vh] pr-1">
          <div className="flex flex-col gap-3">
            {history.map((chat, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-gray-100 border border-gray-200 transition"
              >
                <CardContent className="p-3 text-sm font-medium text-gray-800">
                  {chat}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col border-t pt-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-800">{username}</span>
        </div>
        <Link href="/profile" className="text-sm text-orange-600 hover:underline text-left">
          Meu perfil
        </Link>
      </div>
    </aside>
  );
}