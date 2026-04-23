import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={56} duration={60} durationOnHover={20}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-7 select-none object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
            height={logo.height ?? 28}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width ?? "auto" as unknown as number}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
