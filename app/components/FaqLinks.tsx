import { VisuallyHidden } from "@sozialhelden/ui";
import { T } from "@transifex/react";
import type { ComponentProps } from "react";
import FaqLink from "~/components/FaqLink";

export default function FaqLinks(props: ComponentProps<"div">) {
  return (
    <div {...props}>
      <VisuallyHidden>
        <h2>
          <T _str="FAQ" />
        </h2>
      </VisuallyHidden>
      <nav>
        <ul className="space-y-2.5">
          <li>
            <FaqLink to="/faqs/what-is-a11y-score">
              <T _str="What is a11y-Score?" />
            </FaqLink>
          </li>
          <li>
            <FaqLink to="/faqs/how-is-it-calculated">
              <T _str="How is it calculated?" />
            </FaqLink>
          </li>
          <li>
            <FaqLink to="/faqs/how-to-interpret-the-score">
              <T _str="How to interpret the score?" />
            </FaqLink>
          </li>
          <li>
            <FaqLink to="/faqs/what-data-is-being-used">
              <T _str="What data is being used?" />
            </FaqLink>
          </li>
          <li>
            <FaqLink to="/faqs/how-to-contribute">
              <T _str="How can I contribute?" />
            </FaqLink>
          </li>
          <li>
            <FaqLink to="/faqs/give-feedback">
              <T _str="Give feedback" />
            </FaqLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
