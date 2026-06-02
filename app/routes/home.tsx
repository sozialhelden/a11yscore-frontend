import {
  Button,
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
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
    nameEn: string | null;
    slug: string;
    globalCapital: boolean;
  }[];
};

type AdminArea = {
  osmId: number;
  name: string;
  nameEn: string | null;
  slug: string;
  hash: string;
  globalCapital: boolean;
};

type AdminAreaGroup = {
  value: string;
  items: AdminArea[];
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
      name:
        adminArea.nameEn && adminArea.nameEn !== adminArea.name
          ? `${adminArea.nameEn} (${adminArea.name})`
          : adminArea.name,
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

  const groups = useMemo((): AdminAreaGroup[] => {
    const sorted = adminAreas
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const regions = sorted.filter((a) => !a.globalCapital);
    const capitals = sorted.filter((a) => a.globalCapital);
    return [
      { value: t("Regions in Germany"), items: regions },
      { value: t("Global Capitals"), items: capitals },
    ];
  }, [adminAreas, t]);

  const [selectedAdminAreaHash, setSelectedAdminAreaHash] = useState<
    string | null
  >(null);

  const selectedAdminArea = useMemo(() => {
    if (!selectedAdminAreaHash) return undefined;
    for (const group of groups) {
      const found = group.items.find((a) => a.hash === selectedAdminAreaHash);
      if (found) return found;
    }
    return undefined;
  }, [groups, selectedAdminAreaHash]);

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

        <form
          onSubmitCapture={onSubmit}
          className="flex flex-col md:flex-row gap-6"
        >
          <div className="flex-1">
            <Combobox
              items={groups}
              value={selectedAdminArea}
              onValueChange={(value) => {
                setSelectedAdminAreaHash(value?.hash ?? null);
              }}
              itemToStringLabel={(adminArea: AdminArea) => adminArea.name}
            >
              <ComboboxInput
                placeholder={t("Select a region or start typing...")}
              />
              <ComboboxContent>
                <ComboboxEmpty>{t("No items found.")}</ComboboxEmpty>
                <ComboboxList>
                  {(group: AdminAreaGroup, index: number) => (
                    <ComboboxGroup key={group.value} items={group.items}>
                      <ComboboxLabel>{group.value}</ComboboxLabel>
                      <ComboboxCollection>
                        {(adminArea: AdminArea) => (
                          <ComboboxItem key={adminArea.hash} value={adminArea}>
                            {adminArea.name}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                      {index < groups.length - 1 && <ComboboxSeparator />}
                    </ComboboxGroup>
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
