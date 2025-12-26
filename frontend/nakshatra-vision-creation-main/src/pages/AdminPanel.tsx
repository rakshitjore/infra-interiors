import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase, isSupabaseConfigured, Contact } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Search, Phone, Mail, User, Calendar } from "lucide-react";

const AdminPanel = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Simple password check (in production, use Supabase Auth)
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      loadContacts();
    } else {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  useEffect(() => {
    // Check if already authenticated
    if (sessionStorage.getItem("admin_authenticated") === "true") {
      setIsAuthenticated(true);
      loadContacts();
    }
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      if (!supabase || !isSupabaseConfigured) {
        throw new Error(
          "Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment."
        );
      }
      // Note: You'll need to set up RLS policies or use service role key for admin
      // For now, this assumes you've configured RLS to allow authenticated reads
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      console.error("Error loading contacts:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load contacts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🔧 Supabase Not Configured
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-600">
            <p>
              Please create a <code>.env</code> file with the following variables to enable the admin panel:
            </p>
            <div className="rounded-md bg-gray-100 p-4 font-mono text-sm">
              <div>VITE_SUPABASE_URL=your-project-url</div>
              <div>VITE_SUPABASE_ANON_KEY=your-anon-key</div>
              <div>VITE_ADMIN_PASSWORD=your-admin-password</div>
            </div>
            <p>
              After updating the environment variables, restart the development server.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🔐 Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Password:
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🏠 Nakshatra INFRA & INTERIOR - Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage contact form submissions
            </p>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900">
                {contacts.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Total Submissions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900">
                {
                  contacts.filter(
                    (c) =>
                      new Date(c.created_at || "").toDateString() ===
                      new Date().toDateString()
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Today's Submissions
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading contacts...</div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500 text-lg">
                {searchTerm
                  ? "No contacts found matching your search."
                  : "No contact submissions yet."}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          {contact.name}
                        </h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                        {contact.service && (
                          <div>
                            <strong>Service:</strong> {contact.service}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {contact.created_at
                              ? new Date(contact.created_at).toLocaleString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sm:w-96">
                      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <strong className="text-gray-700 block mb-2">
                          Message:
                        </strong>
                        <p className="text-gray-600 whitespace-pre-wrap">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

