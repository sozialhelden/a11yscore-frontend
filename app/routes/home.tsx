import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  VisuallyHidden,
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import { ArrowRight, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useNavigation } from "react-router";
import { z } from "zod";
import { allowedRegions } from "~/config/regions";

export function meta() {
  return [
    { title: "a11y-Score" },
    {
      name: "description",
      content:
        "Web application to rate the accessibility of the physical world.",
    },
  ];
}

export default function Home() {
  const t = useT();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const formSchema = z.object({
    region: z.enum(allowedRegions, t("Please select a valid region")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isNavigating) {
      return;
    }
    navigate(`/score/${values.region.trim()}`);
  }

  return (
    <div className="space-y-12 py-12">
      <h2 className="text-5xl leading-normal font-bold">
        <T _str="Compare your region" />
      </h2>

      <p className="text-gray-500">
        <T _str="The a11y-Score rates the accessibility of your state, muncipality or city. Start now and choose a region to see the score." />
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={"Select a region"} />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isNavigating}>
            {"Calculate a11y-Score"}
            {isNavigating && (
              <div className="">
                <Loader className="animate animate-spin" />
              </div>
            )}
          </Button>
        </form>
      </Form>

      <VisuallyHidden>
        <h2>
          <T _str="FAQ" />
        </h2>
      </VisuallyHidden>
      <nav className="mt-24 font-medium">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/what"
              className="flex items-center gap-2 hover:underline hover:text-primary"
            >
              <ArrowRight size={16} aria-hidden />
              <T _str="What is a11y-Score?" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/how"
              className="flex items-center gap-2 hover:underline hover:text-primary"
            >
              <ArrowRight size={16} aria-hidden />
              <T _str="How is it calculated?" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/data"
              className="flex items-center gap-2 hover:underline hover:text-primary"
            >
              <ArrowRight size={16} aria-hidden />
              <T _str="What data do you use?" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className="flex items-center gap-2 hover:underline hover:text-primary"
            >
              <ArrowRight size={16} aria-hidden />
              <T _str="Give feedback" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
