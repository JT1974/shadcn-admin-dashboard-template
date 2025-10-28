"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useCallback } from "react"

export function CreateUserForm({
  createUser,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  createUser: ({
    email,
    firstname,
    lastname,
    phone,
    password
  }: Partial<ICurrentUser> & {
    password: string
  }) => Promise<void>
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")

  const handleCreateUser = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      await createUser({
        email,
        password,
        phone,
        firstname,
        lastname
      })
    },
    [email, password, phone, firstname, lastname, createUser]
  )

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create user</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Phone</Label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="+36301234567"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Firstname</Label>
                <Input
                  id="firstname"
                  type="firstname"
                  placeholder="John"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Lastname</Label>
                <Input
                  id="lastname"
                  type="lastname"
                  placeholder="Doe"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
