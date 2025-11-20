import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Navigation from './Navigation';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input placeholder="Your email" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea placeholder="How can we help?" />
                </div>
                <Button>Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
