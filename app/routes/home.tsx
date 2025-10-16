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
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useNavigation } from "react-router";
import { z } from "zod";
import FaqLinks from "~/components/FaqLinks";
import { allowedAdminAreas } from "~/config";

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
    region: z.enum(
      Object.values(allowedAdminAreas).map(({ id }) => String(id)),
      t("Please select a valid region"),
    ),
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
      <h2 className="text-4xl md:text-5xl leading-normal font-bold">
        <T _str="Compare your region" />
      </h2>

      <p className="text-gray-500">
        <T _str="The a11y-Score rates the accessibility of your state, muncipality or city. Start now and choose a region to see the score." />
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6"
        >
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
                      <SelectValue placeholder={t("Select a region")} />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedAdminAreas.map(({ id, name }) => (
                        <SelectItem key={id} value={String(id)}>
                          {name}
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
            <T _str="Calculate a11y-Score" />
            {isNavigating && (
              <div className="">
                <Loader className="animate animate-spin" />
              </div>
            )}
          </Button>
        </form>
      </Form>

      <FaqLinks className="mt-24" />
    </div>
  );
}
