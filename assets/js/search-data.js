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
  },{id: "dropdown-publications",
              title: "Publications",
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
            },{id: "dropdown-all-software",
              title: "All Software",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/ccl-website/softwares/";
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
                window.location.href = "https://github.com/cooperative-computing-lab";
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
        },{id: "post-workshop-on-harmonizing-python-workflows-at-ieee-e-science-2025",
        
          title: "Workshop on Harmonizing Python Workflows at IEEE e-Science 2025",
        
        description: "We helped host the Workshop on Harmonizing Python Workflows at IEEE International Conference on e-Science on Monday, 15 Sep 2025. This workshop is one compon…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/workshop-on-harmonizing-python/";
          
        },
      },{id: "post-welcome-back-colin",
        
          title: "Welcome Back, Colin!",
        
        description: "This past summer, 4th year PhD student Colin Thomas completed an internship at the National Energy Research Scientific Computing Center (NERSC) located at th…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/welcome-back-colin/";
          
        },
      },{id: "post-new-semester-new-faces",
        
          title: "New Semester, New Faces",
        
        description: "The new semester is here, and we’re excited to welcome three new colleagues and roll out a clear plan for the months ahead. New faces. Lax joins as a first-y…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/new-semester-new-faces/";
          
        },
      },{id: "post-ccl-team-at-gcasr-2025",
        
          title: "CCL Team at GCASR 2025",
        
        description: "Members of the CCL team traveled to Chicago, Illinois on May 8 to attend GCASR 2025 (12th Greater Chicago Area Systems Research Workshop). CCL team members p…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/ccl-team-at-gcasr/";
          
        },
      },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/plotly/";
          
        },
      },{id: "post-reshaping-high-energy-physics-applications-using-taskvine-sc24",
        
          title: "Reshaping High Energy Physics Applications Using TaskVine  @ SC24",
        
        description: "Barry Sly-Delgado presented our paper titled: &quot; Reshaping High Energy Physics Applications for Near-Interactive Execution Using TaskVine &quot; at the 2024 Superc…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/reshaping-high-energy-physics/";
          
        },
      },{id: "post-shepherd-paper-at-works-sc-2024",
        
          title: "Shepherd Paper at WORKS/SC 2024",
        
        description: "Grad student Saiful Islam presented our paper on Shepherd at the 19th Workshop on Workflows in Support of Large-Scale Science at Supercomputing 2024 in Atlan…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2025/shepherd-paper-at-works/";
          
        },
      },{id: "post-data-pruning-mechanism-in-daskvine",
        
          title: "Data Pruning Mechanism in Daskvine",
        
        description: "In our recent work, we introduced a file pruning technique into DaskVine to address challenges in managing intermediate files in DAG-based task graphs. This …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/data-pruning-mechanism-in/";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/photo-gallery/";
          
        },
      },{id: "post-taskvine-parsl-integration",
        
          title: "TaskVine + Parsl Integration",
        
        description: "The Cooperative Computing Lab team has an ongoing collaboration with the Parsl Project , maintaining the TaskVine Executor for use with the Parsl workflow sy…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/taskvine-parsl-integration/";
          
        },
      },{id: "post-accelerating-function-centric-applications-via-reusable-function-context-in-workflow-systems",
        
          title: "Accelerating Function-Centric Applications via Reusable Function Context in Workflow Systems",
        
        description: "Modern applications are increasingly being written in high-level programming languages (e.g., Python) via popular parallel frameworks (e.g., Parsl, TaskVine,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/accelerating-function-centric-applications/";
          
        },
      },{id: "post-a-new-visualization-tool-for-taskvine-released",
        
          title: "A New Visualization Tool for TaskVine Released",
        
        description: "We released a web-based tool to visualize runtime logs produced by TaskVine, available on Github . Using this tool involves two main steps. First, the requir…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/a-new-visualization-tool/";
          
        },
      },{id: "post-integrating-taskvine-with-merlin",
        
          title: "Integrating TaskVine with Merlin",
        
        description: "Graduate student, Barry Sly-Delgado , completed a summer internship onsite at Lawrence Livermore National Laboratory where he worked on integrating TaskVine …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/integrating-taskvine-with-merlin/";
          
        },
      },{id: "post-introducing-shepherd-simplifying-integration-of-service-workflows-into-task-based-workflows",
        
          title: "Introducing Shepherd: Simplifying Integration of Service Workflows into Task-Based Workflows",
        
        description: "We are pleased to announce the release of Shepherd , an open-source tool designed to streamline the integration of service workflows into task-based workflow…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/introducing-shepherd-simplifying-integration/";
          
        },
      },{id: "post-taskvine-at-parslfest-2024",
        
          title: "TaskVine at ParslFest 2024",
        
        description: "On September 26-27 members of the CCL team attended ParslFest 2024 in Chicago, Illinois to speak about TaskVine and connect with our ongoing collaborators at…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/taskvine-at-parslfest-2024/";
          
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
      },{id: "post-predicting-resources-of-tasks-in-dynamic-workflows-with-bucketing-algorithms-at-ipdps-2024",
        
          title: "Predicting Resources of Tasks in Dynamic Workflows with Bucketing Algorithms at IPDPS 2024...",
        
        description: "Thanh Son Phung will present Adaptive Task-Oriented Resource Allocation for Large Dynamic Workflows on Opportunistic Resources at the International Parallel …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/predicting-resources-of-tasks/";
          
        },
      },{id: "post-taskvine-at-the-hep-analysis-grand-challenge",
        
          title: "TaskVine at the HEP Analysis Grand Challenge",
        
        description: "Barry Sly-Delgado and Ben Tovar recently presented our work on transforming high energy physics data analysis applications into near-interactive execution at…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/taskvine-at-the-hep/";
          
        },
      },{id: "post-cctools-7-8-0-released",
        
          title: "CCTools 7.8.0 released",
        
        description: "We are pleased to announce the release of version 7.8.0 of the Cooperative Computing Tools from the University of Notre Dame, including TaskVine, Work Queu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/ccl-website/blog/2024/cctools-7-8-0/";
          
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
      },{id: "alt-makeflow",
          title: 'Makeflow',
          description: "Makeflow is a workflow system for executing large complex workflows on clusters, clouds, and grids.",
          section: "Alt",handler: () => {
              window.location.href = "/ccl-website/alt/makeflow/";
            },},{id: "alt-taskvine",
          title: 'TaskVine',
          description: "TaskVine is our third-generation workflow system for building scalable data intensive applications that run on HPC clusters, cloud services, and other clusters.",
          section: "Alt",handler: () => {
              window.location.href = "/ccl-website/alt/taskvine/";
            },},{id: "books-the-godfather",
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
            },},{id: "projects-template-page",
          title: 'Template Page',
          description: "Expresses workflow I/O intentions using consistency contracts to enable efficient, cluster-wide storage and execution optimizations.",
          section: "Projects",handler: () => {
              window.location.href = "/ccl-website/projects/pledge%20copy/";
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
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/cooperative-computing-lab", "_blank");
        },
      },{
        id: 'social-linkedin_company',
        title: 'Linkedin_company',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-read_the_docs',
        title: 'Read_the_docs',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/ccl-website/feed.xml", "_blank");
        },
      },];
