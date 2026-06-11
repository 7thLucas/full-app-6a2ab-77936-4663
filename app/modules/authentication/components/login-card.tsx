import { Form, Link, useActionData, useNavigation } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Sparkles, Shield } from "lucide-react";

interface ActionData {
  error?: string;
}

export function LoginCard() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Sparkles size={24} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">NovaStack</h1>
          <p className="text-sm text-muted-foreground mt-1">Command Center</p>
        </div>

        <Card className="border-border bg-card shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Shield size={16} className="text-primary" />
              Sign in
            </CardTitle>
            <CardDescription className="text-xs">
              Private access — NovaSphere ecosystem management
            </CardDescription>
          </CardHeader>

          <Form method="post">
            <CardContent className="space-y-4">
              {actionData?.error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                  {actionData.error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@novasphere.tech"
                  required
                  autoComplete="email"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Password
                  </Label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="h-10"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-0">
              <Button
                type="submit"
                className="w-full h-10"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in to NovaStack"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link to="/auth/register" className="text-primary hover:text-primary/80 transition-colors">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Form>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          One Command Center. Every NovaSphere Asset. Zero Chaos.
        </p>
      </div>
    </div>
  );
}
