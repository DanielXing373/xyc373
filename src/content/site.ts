import type { SiteContent } from "./types";

export const site: SiteContent = {
  title: "Yuchen Xing's Portfolio",
  email: "yuchenxing373@gmail.com",
  phone: "+1 615-497-4810",
  resumePdf: "/resume.pdf",
  aiEthicsPdf: "/media/ai-ethics/cal-evaluation.pdf",
  hero: {
    name: "Yuchen Xing (Daniel)",
    portrait: {
      src: "/media/portrait.jpg",
      alt: "Yuchen Xing",
    },
  },
  education: [
    {
      id: "cornell",
      school: "Cornell University (Cornell Tech)",
      years: "Aug 2026 — May 2027 (expected)",
      note: "Master of Engineering\nElectrical and Computer Engineering",
      icon: "/media/education/cornell.png?v=20260905",
      iconAlt: "Cornell Tech logo.",
    },
    {
      id: "vanderbilt",
      school: "Vanderbilt University",
      years: "Aug 2024 — May 2026",
      note: "Bachelor of Science · Computer Science\nGPA 3.78",
      icon: "/media/education/vanderbilt.png",
      iconAlt: "Vanderbilt University seal.",
    },
    {
      id: "rochester",
      school: "University of Rochester",
      years: "Aug 2022 — May 2024",
      note: "Computer Science, then transferred.",
      icon: "/media/education/rochester.png",
      iconAlt: "University of Rochester logo.",
    },
  ],
  featured: [
    {
      id: "pgwhite",
      title: "Pigeon White",
      tag: "",
      scrollMarginClass: "scroll-mt-16",
      heroBlurb:
        "A multi-dimensional, personalized quote library with bilingual UI, multi-axis filtering, and URL-synced search.",
      oneLine:
        "A **multi-dimensional, personalized quote library** ([pgwhitelib.com](https://www.pgwhitelib.com)) with bilingual UI, multi-axis filtering, and URL-synced search.",
      mediaSide: "start",
      summaryBullets: [
        "Built and maintained an end-to-end **quote library** in **Nuxt** and **MySQL**, with a **bilingual UI** (zh/en), **multi-axis filtering**, and **URL-synced search** for shareable queries, based on need-finding research and user interviews",
        "Designed a **normalized MySQL schema** with **entity–translation** separation, so locale-aware content and search do not duplicate core records",
        "Built **automated ingestion** through **WeChat Reading** agent/skill APIs to batch-export readers’ own highlights from years of reading; ongoing work toward **multi-user collaboration** and **machine-learning** recommendations",
        "Special thanks to Dr. Vikash Singh for guidance.",
      ],
      media: [
        {
          type: "video",
          src: "/media/pgwhite/demo.mp4",
          alt: "A walkthrough of the Pigeon White quote library at pgwhitelib.com.",
          caption:
            "A walkthrough of the quote library at pgwhitelib.com, including bilingual UI and multi-axis filtering.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/pgwhite/slide-01.jpg",
          alt: "Pigeon White Library poster: a reader-centered, multi-dimensional quote database.",
          caption: "Poster.",
          detail: "",
        },
      ],
    },
    {
      id: "deathspire-codex",
      title: "DeathSpire Codex",
      tag: "",
      scrollMarginClass: "scroll-mt-16",
      oneLine:
        "A **two-player strategy card battle** in VR, built in Unity.",
      mediaSide: "end",
      summaryBullets: [
        "Built with AI-assisted workflows: generated prototype models, animations, and iterative design support",
        "Developed in **Unity** with **Meta XR** building blocks, including a state machine for animation and decision-making",
        "My design covers **card refresh** logic, AI pathfinding, and combat",
        "Explored spatial interaction as a game strategy in a VR world",
        "Special thanks to Vanderbilt University for providing VR equipment and guidance.",
      ],
      summaryNote:
        "Unfortunately, due to an equipment replacement, most of the footage was lost. Existing footage is shown here.",
      media: [
        {
          type: "video",
          src: "/media/vr/02.mp4",
          alt: "A 70%-complete demo of DeathSpire Codex.",
          caption: "A 70%-complete demo.",
          detail: "",
        },
        {
          type: "video",
          src: "/media/vr/01.mp4",
          alt: "The waiting lobby at the start of a DeathSpire Codex match.",
          caption: "The waiting lobby at the start of a match.",
          detail: "",
        },
        {
          type: "video",
          src: "/media/vr/03.mp4",
          alt: "A prototype that evolved into the card refresh logic in DeathSpire Codex.",
          caption: "A prototype that evolved into the card refresh logic.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/vr/slide-01.jpg",
          alt: "DeathSpire Codex poster: gameplay, team, user flow, and challenges.",
          caption: "Poster",
          detail: "",
        },
      ],
    },
  ],
  interests: [
    {
      id: "print-3d",
      title: "3D Printing",
      mediaSide: "start",
      scrollMarginClass: "scroll-mt-16",
      sections: [
        {
          heading: "Automatic syringe pump",
          intro: "An automatic syringe pump with **3D printed hardware**.",
          bullets: [
            "Everything is **printed** except the metal parts, electronics, and the syringe, which were provided by [Vanderbilt’s Digital Fabrication Lab](https://www.digitalfabricationlab.com/)",
            "Compatible with **two syringe sizes**, with start, pause, forward, and reverse functions. A **limit switch** stops the drive when the plunger reaches empty",
            "An **LCD** shows speed and estimated time",
            "Code written in **Arduino C++**, with an Arduino as the main controller.",
          ],
        },
        {
          heading: "Phone case",
          intro: "A case modeled on my iPhone 15.",
          bullets: [
            "Printed in **TPU** for its flexibility and protectiveness",
            "Iterated on the volume buttons and the mute switch for the **tactile feel of the press**",
            "The pattern is the Mark of Muse from Identity V.",
          ],
        },
      ],
      media: [
        {
          type: "video",
          src: "/media/print-3d/demo.mp4",
          alt: "Demo of the 3D-printed pump with start, pause, and reverse controls.",
          caption: "The pump demonstrating its three buttons",
          detail: "start/pause, forward, and reverse.",
        },
        {
          type: "image",
          src: "/media/print-3d/syringe-pump.jpg",
          alt: "Full view of the 3D-printed syringe pump on the rail.",
          caption: "The whole pump, end to end.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/assembly.jpg",
          alt: "Close-up of the stepper motor on the printed pump.",
          caption: "A close-up of the motor.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/actuator.jpg",
          alt: "Autodesk Fusion render of the linear actuator.",
          caption: "A render from Autodesk Fusion.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/enclosure.jpg",
          alt: "Enclosure drawing from Autodesk Fusion.",
          caption:
            "Enclosure drawing from Autodesk Fusion. Compact, easy to carry, and easy to keep water out.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/breadboard.jpg",
          alt: "Arduino breadboard for the pump.",
          caption: "The pump’s breadboard sitting on an Arduino.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/emblem.jpg",
          alt: "Group logo printed on a 3D part.",
          caption: "Logo",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/cases.jpg",
          alt: "Two TPU phone cases with the iPhone they were made for.",
          caption:
            "TPU phone cases for my iPhone 15. Designed and iterated by me.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/print-3d/printing.jpg",
          alt: "Phone case printing on the 3D printer.",
          caption: "Printing the phone case.",
          detail: "",
        },
      ],
    },
    {
      id: "ai-ethics",
      title: "Research on AI in education (AIED)",
      mediaSide: "end",
      layout: "compact",
      albumAspect: "16 / 9",
      intro:
        "Produced a **simulated memo**, drafted as a briefing for the Tennessee Department of Education. The research includes:",
      bullets: [
        "Interviews with people working in the field",
        "Independent research on current policy and practice",
        "Literature studies on AI, education, and advocacy",
        "[CAL Evaluation and Guided Adoption of AIED](/ai-ethics).",
      ],
      media: [
        {
          type: "image",
          src: "/media/ai-ethics/01.jpg",
          alt: "Title slide: Regulations on AI in Education.",
          caption: "Slide deck used at the research presentation.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/ai-ethics/02.jpg",
          alt: "Slide on AI in general.",
          caption: "Slide deck used at the research presentation.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/ai-ethics/03.jpg",
          alt: "Slide on AI in education, with pros and cons.",
          caption: "Slide deck used at the research presentation.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/ai-ethics/04.jpg",
          alt: "Slide on current Tennessee AI education policy bills.",
          caption: "Slide deck used at the research presentation.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/ai-ethics/05.jpg",
          alt: "Slide comparing AI education policy in other states.",
          caption: "Slide deck used at the research presentation.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/ai-ethics/06.jpg",
          alt: "Slide on the core problem of distributed responsibility.",
          caption: "Slide deck used at the research presentation.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/ai-ethics/07.jpg",
          alt: "Slide showing government, school, and developer.",
          caption: "See the write-up for the detailed 11-page memo.",
          detail: "",
        },
      ],
    },
    {
      id: "figma-app",
      title: "Reuse, Reduce, Recycle",
      mediaSide: "start",
      albumAspect: "1241 / 1021",
      intro:
        "A marketplace app for the Vanderbilt campus community.",
      bullets: [
        "Unified Vanderbilt gold color scheme",
        "Share calendar function that supports **batch sharing**. This addresses the **pain point** of traditional text-based calendar sharing",
        "**Offline mode** allows limited access to scheduled meetings and some product information, with a conspicuous visual cue at the top",
        "Iterated through **usability tests** and the **need-finding process**, including user observation, interviews, Wizard of Oz, and click-through tests.",
      ],
      media: [
        {
          type: "image",
          src: "/media/figma-app/home.png",
          alt: "Reuse Reduce Recycle app: home with a pickup reminder and recommended items.",
          caption: "Homepage.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/figma-app/profile.png",
          alt: "Reuse Reduce Recycle app: seller profile with ratings and reviews.",
          caption: "Seller profile. Only past buyers can rate the seller.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/figma-app/calendar.png",
          alt: "Reuse Reduce Recycle app: October calendar for pickup time and sharing.",
          caption: "Share calendar that supports convenient batch sharing of dates.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/figma-app/offline.png",
          alt: "Reuse Reduce Recycle app: offline home screen with a connection-failed state.",
          caption: "Offline mode. A conspicuous visual cue at the top.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/figma-app/process.png",
          alt: "Design notes on availability status, from sketch to mid-fidelity listings.",
          caption: "The first several iterations of the interface.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/figma-app/canvas.png",
          alt: "Figma canvas overview of the Reuse Reduce Recycle screen set.",
          caption: "An overview of the Figma canvas.",
          detail: "",
        },
      ],
    },
  ],
  internships: [
    {
      id: "intern-1",
      title: "NetEase Games",
      mediaSide: "end",
      scrollMarginClass: "scroll-mt-32",
      layout: "compact",
      albumAspect: "16 / 9",
      heroBlurb:
        "**Game testing engineer** at NetEase, Hangzhou, June to August 2026.",
      intro:
        "Worked as a **game testing engineer** at NetEase, Hangzhou, June to August 2026, testing **Where Winds Meet**, including [auto chess](https://mp.weixin.qq.com/s?__biz=Mzk0NTQwMTA2Ng==&mid=2247498665&idx=1&sn=cef3dd915d9a70c67930ee6441213ce7) mode, [multiplayer boss](https://mp.weixin.qq.com/s?__biz=Mzk0NTQwMTA2Ng==&mid=2247498739&idx=1&sn=2cf942d91b9eb6b9b817c397e7110372) mode, and pet battling mode:",
      bullets: [
        "Tested **basic** **game logic**, **game balance**, and **user experience**",
        "Created and renovated **skills** for **agents**, enabling match monitoring, automated risk early-warning, **test-case generation**, and large-number **probability verification**",
        "Collaborated with developers and designers throughout the release cycle, via SVN-based workflows.",
      ],
      media: [
        {
          type: "image",
          src: "/media/intern-1/where-winds-meet.jpg",
          alt: "Where Winds Meet logo.",
          caption: "Where Winds Meet.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/auto-chess-battle.gif",
          alt: "Auto chess battle in Where Winds Meet.",
          caption:
            "Auto Chess Mode. It received over **80%** positive reviews after launch.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/auto-chess-shop.gif",
          alt: "Auto chess shop, bench, and unit placement.",
          caption:
            "Auto Chess Mode. It received over **80%** positive reviews after launch.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/winged-combat.gif",
          alt: "Combat against winged enemies in Where Winds Meet.",
          caption: "Multiplayer Boss Mode.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/wind-rises.gif",
          alt: "Wind Rises boss fight in Where Winds Meet.",
          caption: "Multiplayer Boss Mode.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/four-symbols-raid.gif",
          alt: "Four Symbols array multiplayer boss mechanic.",
          caption: "Multiplayer Boss Mode.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/star-absorb.gif",
          alt: "Star-Absorbing Art boss mechanic in Where Winds Meet.",
          caption: "Multiplayer Boss Mode.",
          detail: "",
        },
        {
          type: "image",
          src: "/media/intern-1/companion.jpg",
          alt: "Shop, backpack, and companion stats overlay.",
          caption:
            "Pet Battling Mode. Image source: [925g](https://www.925g.com/gonglue/318936.html).",
          detail: "",
        },
      ],
    },
    {
      id: "intern-2",
      title: "ChicPoint",
      mediaSide: "start",
      layout: "compact",
      albumMaxHeight: "33svh",
      albumChrome: "plain",
      heroBlurb:
        "**Product manager** at ChicPoint, Hangzhou, December 2023 to January 2024.",
      intro:
        "Worked as a **product manager** on the **image search** project at ChicPoint, Hangzhou, December 2023 to January 2024.",
      bullets: [
        "Developed an **image search** feature for ChicPoint’s app using the **Google Vision API**",
        "Used **user-behavior research**, user data, and competitive usability analysis on similar apps to choose tools and set **feature prioritization**",
        "Took part in prototyping and hands-on development, including **Python** scripts for data processing",
        "Planned and ran the **R&D** plan for a **7-member** team: milestones, tasks, and schedules.",
      ],
      media: [
        {
          type: "image",
          src: "/media/intern-2/chicpoint.png",
          alt: "ChicPoint logo.",
          caption: "ChicPoint.",
          detail: "",
        },
      ],
    },
    {
      id: "intern-3",
      title: "Deloitte",
      mediaSide: "end",
      layout: "compact",
      albumAspect: "738 / 387",
      heroBlurb:
        "**Audit & Assurance** at Deloitte, Beijing, July to August 2025.",
      intro:
        "Worked in **Audit & Assurance** at Deloitte, Beijing, July to August 2025.",
      bullets: [
        "Rapidly self-taught core **auditing** principles",
        "Worked with the team on the annual audit: verifying inter-company accounts, consolidating large financial datasets, and preparing key reports for managerial review.",
      ],
      media: [
        {
          type: "image",
          src: "/media/intern-3/deloitte.png",
          alt: "Deloitte logo.",
          caption: "Deloitte.",
          detail: "",
        },
      ],
    },
  ],
};
