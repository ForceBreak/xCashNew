import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SignInForm from '@/components/Forms/SignInForm';
import SignUpForm from '@/components/Forms/SignUpForm';

export default function ModalSignIn() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Sign In</Button>} />
      <DialogContent>
        <Tabs defaultValue="account" className="w-full mt-6">
          <TabsList className="w-full group-data-horizontal/tabs:h-10">
            <TabsTrigger value="signin" className="cursor-pointer">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
