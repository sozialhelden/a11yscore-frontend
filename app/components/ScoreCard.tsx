import { createMemoizedDateTimeFormat } from "@formatjs/ecma402-abstract";
import {
  Button,
  Card,
  CardContent,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  CircleQuestionMark,
} from "lucide-react";
import { useState } from "react";
import { Score } from "~/components/Score";
import type { TopLevelCategoryScoreResult } from "~/routes/score";

export function ScoreCard({
  toplevelCategory,
}: {
  toplevelCategory: TopLevelCategoryScoreResult;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useT();

  return (
    <Card key={toplevelCategory.name}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent>
          <div className="flex justify-between items-center mb-4 -mt-1">
            <h4 className="font-medium text-lg">{toplevelCategory.name}</h4>
            <CollapsibleTrigger>
              <Button
                variant="ghost"
                aria-label={t(`Show more details for ${toplevelCategory.name}`)}
              >
                {isOpen ? (
                  <ChevronsDownUp aria-hidden />
                ) : (
                  <ChevronsUpDown aria-hidden />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex gap-6">
            <Score score={toplevelCategory.score} />
            <span>Lorem Ipsum dolor sit amet</span>
          </div>
        </CardContent>
        <CollapsibleContent>
          <div className="mt-6 pt-4 border-t">
            <CardContent className="space-y-2">
              {toplevelCategory.subCategories.map((subCategory) => (
                <div
                  key={subCategory.name}
                  className="flex gap-4 justify-between items-center"
                >
                  <div className="flex gap-4 items-center font-medium">
                    <Score score={subCategory.score} size="sm" />
                    {subCategory.name}
                  </div>
                  <Dialog>
                    <DialogTrigger>
                      <Button size="icon" variant="ghost">
                        <CircleQuestionMark />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{subCategory.name}</DialogTitle>
                        <DialogDescription>
                          <T
                            _str="The score for {subCategory} is calculated using these criteria:"
                            subCategory={subCategory.name}
                          />
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        {subCategory.topics.map((topic) => (
                          <div key={topic.name} className="">
                            <h4 className="font-medium mb-2">{topic.name}</h4>
                            <ul className="space-y-2">
                              {topic.criteria.map((criterion) => (
                                <li
                                  key={criterion.name}
                                  className="flex gap-2 items-center"
                                >
                                  <Score score={criterion.score} size="sm" />
                                  {criterion.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </CardContent>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
