import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Design Your Custom Phone Case | CasePython",
  description: "Design and customize your phone case. Choose your phone model, case color, and adjust your image to create the perfect custom phone case.",
  image: "/thumbnail.png",
});

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const formatTime = () => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
        .format(now)
        .replace(",", "")
        .replace(" ", "_")
        .replace(" ", "_");
};

const page = async ({ searchParams }: PageProps) => {
    const { id } = searchParams;

    if (!id || typeof id !== "string") {
        return notFound();
    }

    const configuration = await db.configuration.findUnique({
        where: { id },
    });

    if (!configuration) {
        return notFound();
    }

    const { imageUrl, width, height } = configuration;
    const currentTime = formatTime(); 

    return (
        <div>
            <DesignConfigurator
                configId={configuration.id}
                imageDimensions={{ width, height }}
                imageUrl={imageUrl}
                time={currentTime}
            />
        </div>
    );
};

export default page;
