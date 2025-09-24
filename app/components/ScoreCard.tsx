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
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  CircleQuestionMark,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
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
            <h4 className="font-medium md:text-lg">{toplevelCategory.name}</h4>
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
          <div className="flex gap-6 text-sm md:text-base">
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
                  <div className="flex gap-4 items-center">
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
                            _str="The score for {subCategory} is calculated using these criteria. {moreInfoLink}"
                            subCategory={subCategory.name}
                            moreInfoLink={
                              <Link
                                to="/how"
                                className="underline hover:text-primary"
                              >
                                <T _str="Learn more about how we calculate scores." />
                              </Link>
                            }
                          />
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh] -mx-4 -mb-6">
                        <div className="space-y-8 px-4 pb-6 mt-2">
                          {subCategory.topics.map((topic) => (
                            <div key={topic.name} className="">
                              <h4 className="font-medium mb-2">{topic.name}</h4>
                              <ul className="space-y-2">
                                {topic.criteria.map((criterion) => (
                                  <li
                                    key={criterion.name}
                                    className="flex gap-2 items-center"
                                  >
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Score
                                          score={criterion.score}
                                          size="sm"
                                        />
                                      </TooltipTrigger>
                                      {criterion.name}
                                      {criterion.score === 0 && (
                                        <TooltipContent>
                                          <T _str="Not enough data to calculate a score" />
                                        </TooltipContent>
                                      )}
                                    </Tooltip>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
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
