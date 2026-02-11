import {
  Button,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import { Loader } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import FaqLinks from "~/components/FaqLinks";
import Main from "~/components/Main";
import { apiFetch } from "~/utils/api";
import { encodeOsmId } from "~/utils/osmIds";
import type { Route } from "./+types/home";

type AdminAreasResult = {
  adminAreas: {
    osmId: number;
    name: string;
    slug: string;
  }[];
};

type AdminArea = {
  osmId: number;
  name: string;
  slug: string;
  hash: string;
};

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

export async function loader({ context }: Route.LoaderArgs) {
  const result = await apiFetch<AdminAreasResult>(context, `v1/admin-areas`);
  return result.adminAreas.map(
    (adminArea): AdminArea => ({
      ...adminArea,
      hash: encodeOsmId(adminArea.osmId),
    }),
  );
}

export default function Home() {
  const adminAreas = useLoaderData<AdminArea[]>();
  const t = useT();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const [selectedAdminArea, setSelectedAdminArea] = useState<AdminArea>();

  const items = useMemo(() => {
    return adminAreas.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [adminAreas]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isNavigating || !selectedAdminArea) return;
    navigate(`/scores/${selectedAdminArea.hash}-${selectedAdminArea.slug}`);
  }

  return (
    <Main className="bg-white">
      <div className="space-y-12 py-12">
        <h2 className="text-4xl md:text-5xl leading-normal font-bold">
          <T _str="Compare your region" />
        </h2>

        <p className="text-gray-500">
          <T _str="The a11y-Score rates the accessibility of your state, municipality or city. Start now and choose a region to see the score." />
        </p>

        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Combobox
              items={items}
              value={selectedAdminArea}
              onValueChange={(value, eventDetails) => {
                // somehow the combobox fires a second event which clears the selection by setting the value
                // to null. this is to prevent the input field to be cleared:
                if (value == null) return;
                setSelectedAdminArea(value);
              }}
              itemToStringLabel={(adminArea: AdminArea) => adminArea.name}
            >
              <ComboboxInput
                placeholder={t("Select a region or start typing...")}
              />
              <ComboboxContent>
                <ComboboxEmpty>{t("No items found.")}</ComboboxEmpty>
                <ComboboxList>
                  {(adminArea: AdminArea) => (
                    <ComboboxItem key={adminArea.hash} value={adminArea}>
                      {adminArea.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <Button type="submit" disabled={isNavigating || !selectedAdminArea}>
            <T _str="Calculate a11y-Score" />
            {isNavigating && (
              <div className="">
                <Loader className="animate animate-spin" />
              </div>
            )}
          </Button>
        </form>

        <FaqLinks className="mt-24" />
      </div>
    </Main>
  );
}
