import * as React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import Favicon from "../assets/images/yext-favicon.ico";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { Image } from "@yext/pages/components";
import { Markdown, LexicalRichText } from "@yext/react-components";
import MarkdownToJsx from 'markdown-to-jsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiCaretRightCircle, BiCaretLeftCircle } from "react-icons/bi";

export const config: TemplateConfig = {
  stream: {
    $id: "menu-item-stream",
    filter: {
      entityTypes: ["ce_menuItem"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "photoGallery",
      "richTextDescription",
      "c_richTextDescriptionV2",
      "c_markdown",
      "price",
      "c_itemCategory",
      "c_relatedMenu.name",
      "c_relatedMenu.slug",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Menu Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description:
            "This is a description for the Turtlehead Tacos menu page.",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

const Item: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const { 
    _site,
    name,
    price,
    richTextDescription,
    c_richTextDescriptionV2,
    c_markdown,
    photoGallery,
    slug,
    c_relatedMenu,
    c_itemCategory
   } = document;
   console.log("photo gallery array before manipulation");
   console.log(photoGallery);

  return (
    <>
      <PageLayout>
        <Banner name={"Turtlehead Tacos"} />
        <div className="centered-container">
          <div className="section space-y-14 px-10">
            <h2 className="section text-3xl text-center font-bold">{name} (${price.value})</h2>
            <div className="grid md:grid-cols-2 gap-x-5">
              {photoGallery ? (
                <Image
                className="rounded-xl w-100 h-auto drop-shadow-lg"
                image={photoGallery[0].image}
                layout="fill"
                />
                )
                : (
                  <img src="https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1"></img>
                )
              }
                {richTextDescription && 
                  <div className="prose prose-a:text-blue-600">
                    <h2>Description</h2>
                    <MarkdownToJsx className="space-y-5">{richTextDescription}</MarkdownToJsx>
                  </div>
                }  
                {/* {c_markdown && 
                <div className="prose prose-a:text-blue-600">
                  <h2>New Markdown Component</h2>
                  <Markdown content={c_markdown.markdown}/>
                </div>}   */}
                {/* {c_richTextDescriptionV2 && 
                  <div className="section">
                    <div className="prose prose-a:text-blue-600">
                      <h2>New RTD v2 Component</h2>
                      <LexicalRichText serializedAST={JSON.stringify(c_richTextDescriptionV2.json)}/>
                    </div>
                  </div>
                }             */}
            </div>
          </div>
          <div className="section">
            <h2 className="section text-3xl text-center font-bold">Photo Gallery</h2>
            <Carousel photoGallery={photoGallery}></Carousel>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Item;
