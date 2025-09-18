import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, FileText, MessageSquare, Settings, Trash2, Edit, Eye, Wifi, Star, MapPin } from "lucide-react";
import { mockCities } from "@/contexts/CityContext";
import { mockPlans, mockTestimonials, mockBlogPosts, mockCarouselSlides } from "@/data/mockData";
import { cn } from "@/lib/utils";

// Mock data - Em uma aplicação real, isso viria do backend
const mockRegistrations = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    plan: "Plus - 300MB",
    address: "Rua A, 123 - São Paulo, SP",
    date: "2024-12-15",
    status: "Pendente",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    plan: "Premium - 600MB",
    address: "Av. B, 456 - Rio de Janeiro, RJ",
    date: "2024-12-14",
    status: "Aprovado",
  },
];

const mockPosts = [
  {
    id: 1,
    title: "Como escolher a velocidade ideal",
    author: "Admin",
    date: "2024-12-10",
    status: "Publicado",
  },
  {
    id: 2,
    title: "Fibra ótica vs Internet comum",
    author: "Admin",
    date: "2024-12-08",
    status: "Rascunho",
  },
];

const adminNavigation = [
  { id: "registrations", name: "Cadastros", icon: Users },
  { id: "plans", name: "Planos", icon: Wifi },
  { id: "testimonials", name: "Depoimentos", icon: Star },
  { id: "blog", name: "Blog", icon: FileText },
  { id: "cities", name: "Cidades", icon: MapPin },
  { id: "settings", name: "Configurações", icon: Settings },
];

export default function Admin() {
  const [activeSection, setActiveSection] = useState("registrations");
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/">Voltar ao Site</a>
              </Button>
              <Button variant="outline" onClick={logout}>
                Sair
              </Button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap gap-2">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex items-center gap-2",
                    activeSection === item.id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Cadastros Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Depoimentos Novos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-sm text-muted-foreground">Posts do Blog</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Planos Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {/* Cadastros */}
        {activeSection === "registrations" && (
          <Card>
            <CardHeader>
              <CardTitle>Cadastros de Contratação</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium">{registration.name}</TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>{registration.plan}</TableCell>
                      <TableCell>{registration.date}</TableCell>
                      <TableCell>
                        <Badge variant={registration.status === "Aprovado" ? "default" : "secondary"}>
                          {registration.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Planos */}
        {activeSection === "plans" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Planos de Internet</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Velocidade</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Visível</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPlans.slice(0, 3).map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>{plan.speed}</TableCell>
                        <TableCell>R$ {plan.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Switch checked={plan.isVisible} />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {plan.isHighlight && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Destaque
                              </Badge>
                            )}
                            {plan.isPremium && (
                              <Badge className="text-xs bg-gradient-to-r from-primary to-primary/80">
                                Premium
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adicionar/Editar Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="plan-name">Nome do Plano</Label>
                    <Input id="plan-name" placeholder="Ex: Básico, Plus, Premium" />
                  </div>
                  <div>
                    <Label htmlFor="plan-speed">Velocidade</Label>
                    <Input id="plan-speed" placeholder="Ex: 100MB, 300MB, 600MB" />
                  </div>
                  <div>
                    <Label htmlFor="plan-price">Preço (R$)</Label>
                    <Input id="plan-price" type="number" step="0.01" placeholder="59.90" />
                  </div>
                  <div>
                    <Label htmlFor="plan-features">Características (uma por linha)</Label>
                    <Textarea 
                      id="plan-features" 
                      rows={4}
                      placeholder="Wi-Fi grátis&#10;Suporte 24h&#10;Instalação grátis&#10;Netflix incluído"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="plan-visible" />
                      <Label htmlFor="plan-visible">Mostrar no site</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="plan-highlight" />
                      <Label htmlFor="plan-highlight">Marcar como destaque</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="plan-premium" />
                      <Label htmlFor="plan-premium">Plano Premium</Label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>Salvar Plano</Button>
                    <Button variant="outline">Cancelar</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Depoimentos */}
        {activeSection === "testimonials" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Depoimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTestimonials.slice(0, 2).map((testimonial) => (
                    <div key={testimonial.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <Badge variant="default">
                          Publicado
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{testimonial.comment}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Aprovar</Button>
                        <Button size="sm" variant="outline">Editar</Button>
                        <Button size="sm" variant="outline">Excluir</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adicionar Depoimento</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="testimonial-name">Nome</Label>
                    <Input id="testimonial-name" placeholder="Nome do cliente" />
                  </div>
                  <div>
                    <Label htmlFor="testimonial-location">Localização</Label>
                    <Input id="testimonial-location" placeholder="Cidade, Estado" />
                  </div>
                  <div>
                    <Label htmlFor="testimonial-comment">Depoimento</Label>
                    <Textarea id="testimonial-comment" placeholder="Comentário do cliente" />
                  </div>
                  <Button>Adicionar Depoimento</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Blog */}
        {activeSection === "blog" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Posts do Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{post.title}</h4>
                        <Badge variant={post.status === "Publicado" ? "default" : "secondary"}>
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Por {post.author} em {post.date}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Editar</Button>
                        <Button size="sm" variant="outline">Ver</Button>
                        <Button size="sm" variant="outline">Excluir</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Novo Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="post-title">Título</Label>
                    <Input id="post-title" placeholder="Título do post" />
                  </div>
                  <div>
                    <Label htmlFor="post-excerpt">Resumo</Label>
                    <Textarea id="post-excerpt" placeholder="Breve descrição do post" />
                  </div>
                  <div>
                    <Label htmlFor="post-content">Conteúdo</Label>
                    <Textarea id="post-content" rows={8} placeholder="Conteúdo completo do post" />
                  </div>
                  <div className="flex gap-2">
                    <Button>Publicar</Button>
                    <Button variant="outline">Salvar Rascunho</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cidades */}
        {activeSection === "cities" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Cidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Conteúdos</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCities.map((city) => {
                        const cityPlans = mockPlans.filter(p => p.cities.includes(city.id));
                        const cityTestimonials = mockTestimonials.filter(t => t.cities.includes(city.id));
                        const cityPosts = mockBlogPosts.filter(p => p.cities.includes(city.id));
                        const citySlides = mockCarouselSlides.filter(s => s.cities.includes(city.id));
                        
                        return (
                          <TableRow key={city.id}>
                            <TableCell className="font-medium">{city.name}</TableCell>
                            <TableCell>{city.state}</TableCell>
                            <TableCell>
                              <Badge variant={city.isActive ? "default" : "secondary"}>
                                {city.isActive ? "Ativa" : "Inativa"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  {cityPlans.length} planos
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {cityTestimonials.length} depoimentos
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {cityPosts.length} posts
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {citySlides.length} banners
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Switch checked={city.isActive} />
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Nova Cidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="city-name">Nome da Cidade</Label>
                      <Input id="city-name" placeholder="Ex: São Paulo" />
                    </div>
                    <div>
                      <Label htmlFor="city-state">Estado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="city-active" />
                      <Label htmlFor="city-active">Cidade ativa</Label>
                    </div>
                    <Button>Adicionar Cidade</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Associação de Conteúdos */}
            <Card>
              <CardHeader>
                <CardTitle>Associar Conteúdos às Cidades</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="plans-cities">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="plans-cities">Planos</TabsTrigger>
                    <TabsTrigger value="testimonials-cities">Depoimentos</TabsTrigger>
                    <TabsTrigger value="blog-cities">Blog</TabsTrigger>
                    <TabsTrigger value="banners-cities">Banners</TabsTrigger>
                  </TabsList>

                  <TabsContent value="plans-cities" className="mt-6">
                    <div className="space-y-4">
                      {mockPlans.map((plan) => (
                        <div key={plan.id} className="border rounded p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{plan.name} - {plan.speed}</h4>
                              <p className="text-sm text-muted-foreground">R$ {plan.price.toFixed(2)}/mês</p>
                            </div>
                            <Badge variant={plan.isPremium ? "default" : plan.isHighlight ? "secondary" : "outline"}>
                              {plan.isPremium ? "Premium" : plan.isHighlight ? "Destaque" : "Básico"}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Disponível nas cidades:</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {mockCities.map((city) => (
                                <div key={city.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`plan-${plan.id}-city-${city.id}`}
                                    checked={plan.cities.includes(city.id)}
                                  />
                                  <Label htmlFor={`plan-${plan.id}-city-${city.id}`} className="text-sm">
                                    {city.name} - {city.state}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="testimonials-cities" className="mt-6">
                    <div className="space-y-4">
                      {mockTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border rounded p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                              <p className="text-sm mt-1">{testimonial.comment}</p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Visível nas cidades:</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {mockCities.map((city) => (
                                <div key={city.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`testimonial-${testimonial.id}-city-${city.id}`}
                                    checked={testimonial.cities.includes(city.id)}
                                  />
                                  <Label htmlFor={`testimonial-${testimonial.id}-city-${city.id}`} className="text-sm">
                                    {city.name} - {city.state}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="blog-cities" className="mt-6">
                    <div className="space-y-4">
                      {mockBlogPosts.map((post) => (
                        <div key={post.id} className="border rounded p-4">
                          <div className="mb-3">
                            <h4 className="font-semibold">{post.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                            <p className="text-xs text-muted-foreground mt-1">Por {post.author} • {post.date} • {post.readTime}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Disponível nas cidades:</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {mockCities.map((city) => (
                                <div key={city.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`post-${post.id}-city-${city.id}`}
                                    checked={post.cities.includes(city.id)}
                                  />
                                  <Label htmlFor={`post-${post.id}-city-${city.id}`} className="text-sm">
                                    {city.name} - {city.state}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="banners-cities" className="mt-6">
                    <div className="space-y-4">
                      {mockCarouselSlides.map((slide) => (
                        <div key={slide.id} className="border rounded p-4">
                          <div className="mb-3">
                            <h4 className="font-semibold">{slide.title}</h4>
                            <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                            <p className="text-sm mt-1">{slide.description}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Visível nas cidades:</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {mockCities.map((city) => (
                                <div key={city.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`slide-${slide.id}-city-${city.id}`}
                                    checked={slide.cities.includes(city.id)}
                                  />
                                  <Label htmlFor={`slide-${slide.id}-city-${city.id}`} className="text-sm">
                                    {city.name} - {city.state}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Configurações */}
        {activeSection === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informações Gerais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input id="company-name" defaultValue="CAS Internet" />
                    </div>
                    <div>
                      <Label htmlFor="company-phone">Telefone</Label>
                      <Input id="company-phone" defaultValue="(11) 3000-0000" />
                    </div>
                    <div>
                      <Label htmlFor="company-email">E-mail</Label>
                      <Input id="company-email" defaultValue="contato@casinternet.com.br" />
                    </div>
                    <div>
                      <Label htmlFor="company-address">Endereço</Label>
                      <Input id="company-address" defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" placeholder="URL do Facebook" />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" placeholder="URL do Instagram" />
                    </div>
                  </div>
                </div>

                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}