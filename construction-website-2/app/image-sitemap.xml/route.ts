import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://solvesallengineering.com"

  // Define all images with proper metadata
  const images = [
    // Hero Images
    {
      loc: `${baseUrl}/images/hero-1.png`,
      caption: "Professional construction team at work site",
      title: "Solves All Engineering Team",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/hero-2.png`,
      caption: "Modern residential construction project",
      title: "Residential Construction Excellence",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/hero-3.png`,
      caption: "Commercial building construction site",
      title: "Commercial Construction Services",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/hero-4.png`,
      caption: "Commercial facility construction project",
      title: "Commercial Engineering Solutions",
      license: "https://solvesallengineering.com/license",
    },

    // About Page Images
    {
      loc: `${baseUrl}/images/about-team.png`,
      caption: "Solves All Engineering professional team photo",
      title: "Our Expert Engineering Team",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/about-story.png`,
      caption: "Company history and founding story",
      title: "Our Company Story and Values",
      license: "https://solvesallengineering.com/license",
    },

    // Service Images
    {
      loc: `${baseUrl}/images/residential-1.png`,
      caption: "Residential construction and engineering services",
      title: "Residential Engineering Solutions",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/residential-2.png`,
      caption: "Custom home construction project",
      title: "Custom Residential Construction",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/commercial-1.png`,
      caption: "Commercial building engineering project",
      title: "Commercial Engineering Services",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/commercial-2.png`,
      caption: "Office building construction site",
      title: "Commercial Construction Excellence",
      license: "https://solvesallengineering.com/license",
    },


    // Team and Quality Images
    {
      loc: `${baseUrl}/images/quality.png`,
      caption: "Quality assurance and engineering standards",
      title: "Quality Engineering Standards",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/process.png`,
      caption: "Engineering process and methodology",
      title: "Our Engineering Process",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/team-1.png`,
      caption: "Senior engineering team member",
      title: "Senior Engineering Professional",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/team-2.png`,
      caption: "Team management expert",
      title: "Team Management Expert",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/team-3.png`,
      caption: "Field engineering specialist",
      title: "Field Engineering Specialist",
      license: "https://solvesallengineering.com/license",
    },

    // Testimonial Images
    {
      loc: `${baseUrl}/images/testimonial-1.png`,
      caption: "Satisfied client testimonial photo",
      title: "Happy Client Testimonial",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/testimonial-2.png`,
      caption: "Client success story photo",
      title: "Client Success Story",
      license: "https://solvesallengineering.com/license",
    },

    // Service and Contact Images
    {
      loc: `${baseUrl}/images/services-hero.png`,
      caption: "Comprehensive engineering services overview",
      title: "Engineering Services Portfolio",
      license: "https://solvesallengineering.com/license",
    },
    {
      loc: `${baseUrl}/images/contact-hero.png`,
      caption: "Contact us for engineering consultation",
      title: "Contact Solves All Engineering",
      license: "https://solvesallengineering.com/license",
    },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
    .map(
      (image) => `
  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
      <image:license>${image.license}</image:license>
    </image:image>
  </url>`,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
