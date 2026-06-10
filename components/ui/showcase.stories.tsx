import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Search,
  Settings,
  User,
  Mail,
  Plus,
  Minus,
} from "lucide-react";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { AspectRatio } from "./aspect-ratio";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Checkbox } from "./checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { DatePicker } from "./date-picker";
import { Calendar } from "./calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Input } from "./input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
import { Kbd, KbdGroup } from "./kbd";
import { Label } from "./label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Progress } from "./progress";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Separator } from "./separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Skeleton } from "./skeleton";
import { Slider } from "./slider";
import { Toaster } from "./sonner";
import { Spinner } from "./spinner";
import { Switch } from "./switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Textarea } from "./textarea";
import { Toggle } from "./toggle";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { toast } from "sonner";

/* ─── Layout helpers ──────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="bg-background text-foreground min-h-screen space-y-10 p-8">
        {children}
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

const meta = {
  title: "Overview/Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Buttons & actions ───────────────────────────────────────────────────── */

export const ButtonsAndBadges: Story = {
  render: () => (
    <Page>
      <Section title="Button — variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Section>
      <Section title="Button — sizes & icons">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="settings">
          <Settings />
        </Button>
        <Button>
          <Mail /> Login with Email
        </Button>
        <Button disabled>Disabled</Button>
      </Section>
      <Section title="ButtonGroup">
        <ButtonGroup>
          <Button variant="outline">
            <Minus />
          </Button>
          <Button variant="outline">12</Button>
          <Button variant="outline">
            <Plus />
          </Button>
        </ButtonGroup>
      </Section>
      <Section title="Toggle & ToggleGroup">
        <Toggle aria-label="bold">B</Toggle>
        <ToggleGroup type="single" defaultValue="center" variant="outline">
          <ToggleGroupItem value="left">L</ToggleGroupItem>
          <ToggleGroupItem value="center">C</ToggleGroupItem>
          <ToggleGroupItem value="right">R</ToggleGroupItem>
        </ToggleGroup>
      </Section>
      <Section title="Badge">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge>
          <Check /> Verified
        </Badge>
      </Section>
      <Section title="Kbd">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Section>
    </Page>
  ),
};

/* ─── Form controls ───────────────────────────────────────────────────────── */

export const FormControls: Story = {
  render: () => (
    <Page>
      <Section title="Input & Textarea">
        <div className="grid w-72 gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="grid w-72 gap-2">
          <Label htmlFor="msg">Message</Label>
          <Textarea id="msg" placeholder="Type your message…" />
        </div>
        <div className="grid w-72 gap-2">
          <Label htmlFor="disabled">Disabled</Label>
          <Input id="disabled" placeholder="Disabled" disabled />
        </div>
      </Section>
      <Section title="Select">
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Pick a strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
          </SelectContent>
        </Select>
      </Section>
      <Section title="One-time code">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Section>
    </Page>
  ),
};

export const Selection: Story = {
  render: () => (
    <Page>
      <Section title="Checkbox">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox defaultChecked /> Accept terms
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox /> Subscribe
        </label>
      </Section>
      <Section title="Switch">
        <label className="flex items-center gap-2 text-sm">
          <Switch defaultChecked /> Notifications
        </label>
      </Section>
      <Section title="Radio group">
        <RadioGroup defaultValue="monthly" className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="monthly" /> Monthly
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="yearly" /> Yearly
          </label>
        </RadioGroup>
      </Section>
      <Section title="Slider">
        <Slider defaultValue={[40]} max={100} step={1} className="w-64" />
      </Section>
    </Page>
  ),
};

/* ─── Data display ────────────────────────────────────────────────────────── */

export const DataDisplay: Story = {
  render: () => (
    <Page>
      <Section title="Card">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Quantum Computing Leaders</CardTitle>
            <CardDescription>High-conviction thematic basket</CardDescription>
            <CardAction>
              <Badge variant="secondary">+12.4%</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            18 holdings · rebalanced monthly.
          </CardContent>
          <CardFooter>
            <Button className="w-full">Invest</Button>
          </CardFooter>
        </Card>
      </Section>
      <Section title="Table">
        <Table className="w-96">
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["NVDA", "8.2%"],
              ["AAPL", "6.7%"],
              ["MSFT", "5.9%"],
            ].map(([a, w]) => (
              <TableRow key={a}>
                <TableCell className="font-medium">{a}</TableCell>
                <TableCell className="text-right">{w}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
      <Section title="Avatar">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </Section>
      <Section title="Progress / Skeleton / Spinner / Separator">
        <Progress value={64} className="w-64" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Spinner />
        <div className="flex h-5 items-center gap-2 text-sm">
          Docs <Separator orientation="vertical" /> API <Separator orientation="vertical" /> Pricing
        </div>
      </Section>
      <Section title="Aspect ratio">
        <div className="w-64">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md" />
        </div>
      </Section>
      <Section title="Empty state">
        <Empty className="w-80 border rounded-lg">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No results</EmptyTitle>
            <EmptyDescription>Try a different search term.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Section>
    </Page>
  ),
};

/* ─── Feedback ────────────────────────────────────────────────────────────── */

export const Feedback: Story = {
  render: () => (
    <Page>
      <Section title="Alert">
        <Alert className="w-96">
          <Check />
          <AlertTitle>Order submitted</AlertTitle>
          <AlertDescription>Your trade will execute at next open.</AlertDescription>
        </Alert>
        <Alert variant="destructive" className="w-96">
          <Bell />
          <AlertTitle>Insufficient funds</AlertTitle>
          <AlertDescription>Add cash to complete this order.</AlertDescription>
        </Alert>
      </Section>
      <Section title="Toast (Sonner)">
        <Button
          variant="outline"
          onClick={() =>
            toast("Position updated", { description: "NVDA weight set to 8.2%" })
          }
        >
          Show toast
        </Button>
      </Section>
      <Section title="Tooltip & HoverCard">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Annualized return</TooltipContent>
        </Tooltip>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@surmount</Button>
          </HoverCardTrigger>
          <HoverCardContent>Institutional investing, simplified.</HoverCardContent>
        </HoverCard>
      </Section>
    </Page>
  ),
};

/* ─── Overlays ────────────────────────────────────────────────────────────── */

export const Overlays: Story = {
  render: () => (
    <Page>
      <Section title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm rebalance</DialogTitle>
              <DialogDescription>
                This will place 6 orders across your accounts.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Rebalance</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>
      <Section title="Alert dialog">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>
      <Section title="Sheet">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down the strategy list.</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Section>
      <Section title="Popover & Dropdown">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm">Quick settings live here.</PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Menu <ChevronRight />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard /> Billing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>
    </Page>
  ),
};

/* ─── Navigation & disclosure ─────────────────────────────────────────────── */

export const Navigation: Story = {
  render: () => (
    <Page>
      <Section title="Tabs">
        <Tabs defaultValue="overview" className="w-96">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-muted-foreground text-sm">
            Performance and allocation summary.
          </TabsContent>
          <TabsContent value="holdings" className="text-muted-foreground text-sm">
            18 positions.
          </TabsContent>
          <TabsContent value="activity" className="text-muted-foreground text-sm">
            Recent orders.
          </TabsContent>
        </Tabs>
      </Section>
      <Section title="Accordion & Collapsible">
        <Accordion type="single" collapsible className="w-80">
          <AccordionItem value="a">
            <AccordionTrigger>What is a strategy?</AccordionTrigger>
            <AccordionContent>A curated, rules-based basket of assets.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>How is it rebalanced?</AccordionTrigger>
            <AccordionContent>Automatically, on a monthly cadence.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible className="w-64">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Advanced <ChevronRight />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="text-muted-foreground p-3 text-sm">
            Tax-loss harvesting, drift thresholds, and more.
          </CollapsibleContent>
        </Collapsible>
      </Section>
      <Section title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Strategies</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quantum</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>
      <Section title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>
    </Page>
  ),
};

/* ─── Date & calendar ─────────────────────────────────────────────────────── */

export const DateAndCalendar: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Page>
        <Section title="DatePicker (Popover + Calendar)">
          <DatePicker value={date} onChange={setDate} />
        </Section>
        <Section title="Calendar">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Section>
      </Page>
    );
  },
};
