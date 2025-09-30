// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/ccl-website/";
    },
  },{id: "dropdown-papers",
              title: "Papers",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/publications/";
              },
            },{id: "dropdown-projects",
              title: "Projects",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/projects/";
              },
            },{id: "dropdown-people",
              title: "People",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/people/";
              },
            },{id: "dropdown-jobs",
              title: "Jobs",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/jobs/";
              },
            },{id: "dropdown-all-softwares",
              title: "All Softwares",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/Softwares/";
              },
            },{id: "dropdown-manuals",
              title: "Manuals",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://cctools.readthedocs.io/en/stable/";
              },
            },{id: "dropdown-install",
              title: "Install",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/install/";
              },
            },{id: "dropdown-repositories",
              title: "Repositories",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/repositories/";
              },
            },{id: "dropdown-getting-help",
              title: "Getting Help",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/help/";
              },
            },{id: "dropdown-workshops",
              title: "Workshops",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/workshops/";
              },
            },{id: "dropdown-highlights",
              title: "Highlights",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/highlights/";
              },
            },{id: "dropdown-for-developers",
              title: "For Developers",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/developers/";
              },
            },{id: "dropdown-condor-display",
              title: "Condor Display",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "http://condor.cse.nd.edu/condor_matrix.cgi";
              },
            },{id: "dropdown-condor-pool",
              title: "Condor Pool",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/condor/";
              },
            },{id: "dropdown-condor-log-analyzer",
              title: "Condor Log Analyzer",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://condorlog.cse.nd.edu/";
              },
            },{id: "dropdown-internal-docs",
              title: "Internal Docs",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://github.com/cooperative-computing-lab/ccl-internal-docs/blob/master/docs/index.md";
              },
            },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/ccl-website/blog/";
          },
        },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/plotly/";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/photo-gallery/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-a-post-with-tabs",
        
          title: "a post with tabs",
        
        description: "this is what included tabs in a post could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/tabs/";
          
        },
      },{id: "post-a-post-with-typograms",
        
          title: "a post with typograms",
        
        description: "this is what included typograms code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/typograms/";
          
        },
      },{id: "post-a-post-that-can-be-cited",
        
          title: "a post that can be cited",
        
        description: "this is what a post that can be cited looks like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/post-citation/";
          
        },
      },{id: "post-a-post-with-pseudo-code",
        
          title: "a post with pseudo code",
        
        description: "this is what included pseudo code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/pseudocode/";
          
        },
      },{id: "post-a-post-with-code-diff",
        
          title: "a post with code diff",
        
        description: "this is how you can display code diffs",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/code-diff/";
          
        },
      },{id: "post-a-post-with-advanced-image-components",
        
          title: "a post with advanced image components",
        
        description: "this is what advanced image components could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/advanced-images/";
          
        },
      },{id: "post-a-post-with-vega-lite",
        
          title: "a post with vega lite",
        
        description: "this is what included vega lite code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/vega-lite/";
          
        },
      },{id: "post-a-post-with-geojson",
        
          title: "a post with geojson",
        
        description: "this is what included geojson code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/geojson-map/";
          
        },
      },{id: "post-a-post-with-echarts",
        
          title: "a post with echarts",
        
        description: "this is what included echarts code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/echarts/";
          
        },
      },{id: "post-a-post-with-chart-js",
        
          title: "a post with chart.js",
        
        description: "this is what included chart.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/chartjs/";
          
        },
      },{id: "post-a-post-with-tikzjax",
        
          title: "a post with TikZJax",
        
        description: "this is what included TikZ code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/tikzjax/";
          
        },
      },{id: "post-a-post-with-bibliography",
        
          title: "a post with bibliography",
        
        description: "an example of a blog post with bibliography",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/post-bibliography/";
          
        },
      },{id: "post-a-post-with-jupyter-notebook",
        
          title: "a post with jupyter notebook",
        
        description: "an example of a blog post with jupyter notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/jupyter-notebook/";
          
        },
      },{id: "post-a-post-with-custom-blockquotes",
        
          title: "a post with custom blockquotes",
        
        description: "an example of a blog post with custom blockquotes",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/custom-blockquotes/";
          
        },
      },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
        
          title: "a post with table of contents on a sidebar",
        
        description: "an example of a blog post with table of contents on a sidebar",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/sidebar-table-of-contents/";
          
        },
      },{id: "post-a-post-with-audios",
        
          title: "a post with audios",
        
        description: "this is what included audios could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/audios/";
          
        },
      },{id: "post-a-post-with-videos",
        
          title: "a post with videos",
        
        description: "this is what included videos could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/videos/";
          
        },
      },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
        
          title: "displaying beautiful tables with Bootstrap Tables",
        
        description: "an example of how to use Bootstrap Tables",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/tables/";
          
        },
      },{id: "post-a-post-with-table-of-contents",
        
          title: "a post with table of contents",
        
        description: "an example of a blog post with table of contents",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2023/table-of-contents/";
          
        },
      },{id: "post-a-post-with-giscus-comments",
        
          title: "a post with giscus comments",
        
        description: "an example of a blog post with giscus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2022/giscus-comments/";
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "post-a-post-with-redirect",
        
          title: "a post with redirect",
        
        description: "you can also redirect to assets like pdf",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/assets/pdf/example_pdf.pdf";
          
        },
      },{id: "post-a-post-with-diagrams",
        
          title: "a post with diagrams",
        
        description: "an example of a blog post with diagrams",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2021/diagrams/";
          
        },
      },{id: "post-a-distill-style-blog-post",
        
          title: "a distill-style blog post",
        
        description: "an example of a distill-style blog post and main elements",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2021/distill/";
          
        },
      },{id: "post-a-post-with-twitter",
        
          title: "a post with twitter",
        
        description: "an example of a blog post with twitter",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2020/twitter/";
          
        },
      },{id: "post-a-post-with-disqus-comments",
        
          title: "a post with disqus comments",
        
        description: "an example of a blog post with disqus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2015/disqus-comments/";
          
        },
      },{id: "post-a-post-with-math",
        
          title: "a post with math",
        
        description: "an example of a blog post with some math",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2015/math/";
          
        },
      },{id: "post-a-post-with-code",
        
          title: "a post with code",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2015/code/";
          
        },
      },{id: "post-a-post-with-images",
        
          title: "a post with images",
        
        description: "this is what included images could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2015/images/";
          
        },
      },{id: "post-a-post-with-formatting-and-links",
        
          title: "a post with formatting and links",
        
        description: "march &amp; april, looking forward to summer",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2015/formatting-and-links/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/ccl-website/books/the_godfather/";
            },},{id: "highlights-workshop-on-harmonizing-python-workflows-at-ieee-e-science-2025",
          title: 'Workshop on Harmonizing Python Workflows at IEEE e-Science 2025',
          description: "We helped host the Workshop on Harmonizing Python Workflows at IEEE International Conference on e-Science on Monday, 15 Sep 2025.",
          section: "Highlights",handler: () => {
              window.location.href = "/ccl-website/highlights/harmony/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/ccl-website/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-nbflow-from-notebook-to-workflow-and-back-again-cssi-framework",
          title: 'NBFlow: From Notebook to Workflow and Back Again (CSSI Framework)',
          description: "NBFlow brings together interactive notebook technologies (Jupyter), reproducibility tools (SciUnit), and distributed workflows (TaskVine) to enable easy execution of large-scale notebook workflows on heterogeneous HPC clusters.",
          section: "Projects",handler: () => {
              window.location.href = "/ccl-website/projects/nbflow/";
            },},{id: "projects-pledge-accelerating-data-intensive-scientific-workflows-with-consistency-contracts",
          title: 'Pledge: Accelerating Data Intensive Scientific Workflows with Consistency Contracts',
          description: "Expresses workflow I/O intentions using consistency contracts to enable efficient, cluster-wide storage and execution optimizations.",
          section: "Projects",handler: () => {
              window.location.href = "/ccl-website/projects/pledge/";
            },},{id: "projects-sade-a-safety-aware-ecosystem-of-reputable-suas",
          title: 'SADE: A Safety-Aware Ecosystem of Reputable sUAS',
          description: "The overall goal of the project is to develop technology for safety zones that permit only trusted drones to operate in congested or sensitive airspace.",
          section: "Projects",handler: () => {
              window.location.href = "/ccl-website/projects/sade/";
            },},{id: "projects-taskvine-a-user-level-framework-for-data-intensive-scientific-applications-cssi-element",
          title: 'TaskVine: A User Level Framework for Data Intensive Scientific Applications (CSSI Element)',
          description: "TaskVine is open source software for building large scale data intensive dynamic workflows that run on HPC clusters, GPU clusters, and commercial clouds.",
          section: "Projects",handler: () => {
              window.location.href = "/ccl-website/projects/taskvine/";
            },},{id: "projects-xgfabric-coupling-sensor-networks-and-hpc-facilities-with-advanced-wireless-networks-for-near-real-time-simulation-of-digital-agriculture-doe-ascr",
          title: 'XGFabric : Coupling Sensor Networks and HPC Facilities with Advanced Wireless Networks for...',
          description: "This project will explore the design of systems for connecting remote wireless sensor networks with high performance computing systems.",
          section: "Projects",handler: () => {
              window.location.href = "/ccl-website/projects/xgfabric/";
            },},{id: "softwares-floability",
          title: 'Floability',
          description: "Floability is an NSF funded research project to enable the rapid and portable deployment of notebooks expressing complex scientific workflows across a wide range of cyberinfrastructure.",
          section: "Softwares",handler: () => {
              window.location.href = "/ccl-website/softwares/floability/";
            },},{id: "softwares-makeflow",
          title: 'Makeflow',
          description: "Makeflow is a workflow system for executing large complex workflows on clusters, clouds, and grids.",
          section: "Softwares",handler: () => {
              window.location.href = "/ccl-website/softwares/makeflow/";
            },},{id: "softwares-taskvine",
          title: 'TaskVine',
          description: "TaskVine is our third-generation workflow system for building scalable data intensive applications that run on HPC clusters, cloud services, and other clusters.",
          section: "Softwares",handler: () => {
              window.location.href = "/ccl-website/softwares/taskvine/";
            },},{id: "softwares-work-queue",
          title: 'Work Queue',
          description: "Work Queue is an application framework for creating and managing dynamic manager-worker style programs that scale up to tens of thousands of machines on clusters, clouds, and grids.",
          section: "Softwares",handler: () => {
              window.location.href = "/ccl-website/softwares/workqueue/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/ccl-website/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
