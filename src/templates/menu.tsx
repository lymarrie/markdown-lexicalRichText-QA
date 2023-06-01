import * as React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import MenuSection from "../components/MenuSection";
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
import MarkdownToJsx from 'markdown-to-jsx';


export const config: TemplateConfig = {
  stream: {
    $id: "menu-stream",
    filter: {
      entityIds: ["menu"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "photoGallery",
      "c_relatedMenuItems.name",
      "c_relatedMenuItems.price",
      "c_relatedMenuItems.slug",
      "c_relatedMenuItems.photoGallery",
      "c_relatedMenuItems.richTextDescription",
      "c_relatedMenuItems.c_richTextDescriptionV2",
      "c_relatedMenuItems.c_markdown",
      "c_relatedMenuItems.c_itemCategory",
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

const Menu: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const { 
    _site,
    name,
    richTextDescription,
    photoGallery,
    slug,
    c_relatedMenuItems
   } = document;

   const tacos:any = [], quesadillas:any = [], drinks:any = []; 
  
   c_relatedMenuItems.forEach((item) => {
    if (item.c_itemCategory == "TACOS") {
      tacos.push(item);
    } else if (item.c_itemCategory == "QUESADILLAS") {
      quesadillas.push(item);
    } else {
      drinks.push(item)
    }
   });
 
   const tacoDivs = tacos.map((item:any, key:number) => (
      <div key={key} className="card p-5 border-2 rounded-xl bg-gray-100 drop-shadow-md">
        <a href={item.slug} className="space-y-3">
           {item.photoGallery ? (
              <Image
              className="rounded-xl w-100 h-auto"
              image={item.photoGallery[0].image}
              layout="fill"
              /> 
              ) : (
                <img src="https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1"></img>
              )
            }
            <div className="name pt-2 text-2xl text-center font-bold">{item.name}
                <span className="italic text-xl font-normal"> - ${item.price.value}</span>
            </div>
            {item.richTextDescription && 
                  <div className="prose prose-a:text-blue-600">
                    <MarkdownToJsx className="space-y-5">{item.richTextDescription}</MarkdownToJsx>
                  </div>
            } 
        </a>
      </div>
  ));
 
   const quesadillaDivs = quesadillas.map((item:any, key:number) => (
      <div key={key} className="card p-5 border-2 rounded-xl bg-gray-100 drop-shadow-md">
        <a href={item.slug} className="space-y-3">
            {item.photoGallery ? (
              <Image
              className="rounded-xl w-100 h-auto"
              image={item.photoGallery[0].image}
              layout="fill"
              /> 
              ) : (
                <img src="https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1"></img>
              )
            }
            <div className="name pt-2 text-2xl text-center font-bold">{item.name}
                <span className="italic text-xl font-normal"> - ${item.price.value}</span>
            </div>  
            {item.richTextDescription && 
                  <div className="prose prose-a:text-blue-600">
                    <MarkdownToJsx className="space-y-5">{item.richTextDescription}</MarkdownToJsx>
                  </div>
            }       
        </a>
      </div>
  ));
 
   const drinkDivs = drinks.map((item:any, key:number) => (
      <div key={key} className="card p-5 border-2 rounded-xl bg-gray-100 drop-shadow-md">
        <a href={item.slug} className="space-y-3">
            {item.photoGallery ? (
              <Image
              className="rounded-xl w-100 h-auto"
              image={item.photoGallery[0].image}
              layout="fill"
              /> 
              ) : (
                <img src="https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1"></img>
              )
            }
            <div className="name pt-2 text-2xl text-center font-bold">{item.name}
                <span className="italic text-xl font-normal"> - ${item.price.value}</span>
            </div>    
            {item.richTextDescription && 
                  <div className="prose prose-a:text-blue-600">
                    <MarkdownToJsx className="space-y-5">{item.richTextDescription}</MarkdownToJsx>
                  </div>
            }     
        </a>
      </div>
  ));

  return (
    <>
      <PageLayout>
        <Banner name={"Turtlehead Tacos"} />
        <div className="centered-container">
          <div className="section space-y-14 px-10">
            <h2 className="section text-3xl text-center font-bold">Menu Items</h2>
            <MenuSection title="Tacos" children={tacoDivs}/>
            <MenuSection title="Quesadillas" children={quesadillaDivs}/>
            <MenuSection title="Drinks" children={drinkDivs}/>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Menu;
