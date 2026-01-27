// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "dropdown-papers",
              title: "Papers",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/papers/";
              },
            },{id: "dropdown-projects",
              title: "Projects",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/projects/";
              },
            },{id: "dropdown-people",
              title: "People",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/people/";
              },
            },{id: "dropdown-jobs",
              title: "Jobs",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/jobs/";
              },
            },{id: "dropdown-all-software",
              title: "All Software",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/software/";
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
                window.location.href = "https://cctools.readthedocs.io/en/latest/install/";
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
                window.location.href = "/help/";
              },
            },{id: "dropdown-workshops",
              title: "Workshops",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/workshops/";
              },
            },{id: "dropdown-highlights",
              title: "Highlights",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/highlights/";
              },
            },{id: "dropdown-for-developers",
              title: "For Developers",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/developers/";
              },
            },{id: "dropdown-condor-display",
              title: "Condor Display",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "http://condor.cse.nd.edu/condor_matrix.cgi";
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
            },{id: "dropdown-catalog-server",
              title: "Catalog Server",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://catalog.cse.nd.edu/";
              },
            },{id: "dropdown-taskvine-status",
              title: "TaskVine Status",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/software/taskvine/status/";
              },
            },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-taskvine-insights-intermediate-data-model",
        
          title: "TaskVine Insights - Intermediate Data Model",
        
        description: "Large DAGs often bottleneck on intermediate data. Here&#39;s how TaskVine&#39;s temp files keep intermediates on workers and cut manager-side transfers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/taskvine-insights-intermediate-data-model/";
          
        },
      },{id: "post-taskvine-insights-example-workflow-logs",
        
          title: "TaskVine Insights - Example Workflow Logs",
        
        description: "TaskVine users can explore these example logs and gain insights into how workflows are executed, what information TaskVine provides for developers, and which visualization tools are available.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/taskvine-insights-example-logs/";
          
        },
      },{id: "post-graduate-students-share-research-and-systems-insights-at-sc25",
        
          title: "Graduate Students Share Research and Systems Insights at SC25",
        
        description: "Two of our graduate students participated in SC25, presenting work on inference services at NERSC and edge-to-HPC workflows.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/graduate-students-share-research-and-systems-insights-at-sc25/";
          
        },
      },{id: "post-ccl-launches-redesigned-website",
        
          title: "CCL Launches Redesigned Website",
        
        description: "The Cooperative Computing Lab unveils a redesigned website with unified blog, improved navigation, and powerful search capabilities.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ccl-launches-redesigned-website/";
          
        },
      },{id: "post-accelerating-coffea-workflows-with-persistent-preprocessing-cache",
        
          title: "Accelerating Coffea Workflows with Persistent Preprocessing Cache",
        
        description: "High-energy physics analysis at scale depends on efficient data processing pipelines. When working with ROOT files in distributed computing environments, even small inefficiencies compound quickly, es",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/accelerating-coffea-workflows-with-persistent-preprocessing-cache/";
          
        },
      },{id: "post-exploring-execution-strategies-and-compositional-trade-offs-in-the-context-of-large-scale-hep-workflows",
        
          title: "Exploring Execution Strategies and Compositional Trade-Offs in the Context of Large-Scale HEP Workflows...",
        
        description: "The European Organization for Nuclear Research (CERN) has four main High Energy Physics experiments, the Compact Muon Solenoid (CMS) being one of them. These experiments are already approaching the Ex",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/exploring-execution-strategies-and-compositional-trade-offs-in-the-context-of-large-scale-hep-workflows/";
          
        },
      },{id: "post-taskvine-insights-storage-management-depth-aware-pruning",
        
          title: "TaskVine Insights - Storage Management: Depth-Aware Pruning",
        
        description: "Modern scientific workflows often span tens or hundreds of thousands of tasks, forming deep DAGs (directed acyclic graphs) that handle large volumes of intermediate data. The large number of tasks pri",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/taskvine-insights-storage-management-depth-aware-pruning/";
          
        },
      },{id: "post-your-first-distributed-workflow-on-access-ci-a-grad-student-s-checklist-with-taskvine",
        
          title: "Your First Distributed Workflow on ACCESS CI: A Grad Student’s Checklist with TaskVine...",
        
        description: "Most students start with Discover or Explore, and approvals usually take only a few days.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/your-first-distributed-workflow-on-access-ci-a-grad-students-checklist-with-taskvine/";
          
        },
      },{id: "post-scaling-sade-safety-aware-drone-ecosystem-a-hybrid-uav-simulation-system-for-high-fidelity-research",
        
          title: "Scaling SADE (Safety Aware Drone Ecosystem): A Hybrid UAV Simulation System for High-Fidelity...",
        
        description: "Autonomous drones are moving into increasingly complex, real-world environments where safety, compliance, and reliability have to be built in from the start.…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/scaling-sade-safety-aware-drone-ecosystem-a-hybrid-uav-simulation-system-for-hig/";
          
        },
      },{id: "post-wrangling-massive-tasks-graphs-with-dynamic-hierarchical-composition",
        
          title: "Wrangling Massive Tasks Graphs with Dynamic Hierarchical Composition",
        
        description: "On Thursday, Octobor 30, research engineer Ben Tovar presented our recent work on accelerating the execution of High Energy Physics (HEP) workflows at the Py…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/wrangling-massive-tasks-graphs-with-dynamic-hierarchical-composition/";
          
        },
      },{id: "post-taskvine-insights-storage-management-disk-load-shifting",
        
          title: "TaskVine Insights - Storage Management: Disk Load Shifting",
        
        description: "The University of Notre Dame operates an HTCondor cluster with roughly 20,000 cores for scientific computing. The system consists of heterogeneous machines a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/taskvine-insights-storage-management-disk-load-shifting/";
          
        },
      },{id: "post-simulating-digital-agriculture-in-near-real-time-with-xgfabric",
        
          title: "Simulating Digital Agriculture in Near Real-Time with xGFabric",
        
        description: "Advanced scientific applications in digital agriculture require coupling distributed sensor networks with high-performance computing facilities, but this int…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/simulating-digital-agriculture-in-near-real-time-with-xgfabric/";
          
        },
      },{id: "post-undergraduate-researcher-showcases-pledge-project-at-apanac-2025-in-panama",
        
          title: "Undergraduate Researcher Showcases PLEDGE Project at APANAC 2025 in Panama",
        
        description: "On Thursday, October 2, 2025, undergraduate student Andrés Iglesias attended APANAC 2025 , the National Congress dedicated to Science and Technology held in …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/undergraduate-researcher-showcases-pledge-project-at-apanac-2025-in-panama/";
          
        },
      },{id: "post-reducing-overhead-of-llm-integrated-applications-on-gpu-clusters-with-parsl-taskvine",
        
          title: "Reducing Overhead of LLM-integrated Applications on GPU Clusters with Parsl+TaskVine",
        
        description: "Large Language Models (LLMs) are becoming a key tool for scientific discovery, but using them on High-Performance Computing (HPC) clusters is challenging due…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/reducing-overhead-of-llm-integrated-applications-on-gpu-clusters-with-parsltaskv/";
          
        },
      },{id: "post-taskvine-insights-storage-management-pfs-vs-nls",
        
          title: "TaskVine Insights: Storage Management – PFS vs. NLS",
        
        description: "There are two primary storage layers when running workflows in HPC environments: Parallel File System (PFS): A shared file system accessible to all users in …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/taskvine-insights-storage-management-pfs-vs-nls/";
          
        },
      },{id: "post-escience-2025-liberating-the-data-aware-scheduler-to-achieve-locality-in-layered-scientific-workflow-systems",
        
          title: "eScience 2025: Liberating the Data Aware Scheduler to Achieve Locality in Layered Scientific...",
        
        description: "On September 16 graduate student Colin Thomas presented the paper titled: Liberating the Data Aware Scheduler to Achieve Locality in Layered Scientific Workf…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/escience-2025-liberating-the-data-aware-scheduler-to-achieve-locality-in-layered/";
          
        },
      },{id: "post-floability-at-escience-2025-making-notebooks-portable-with-backpacks-across-hpc-clusters",
        
          title: "Floability at eScience 2025: Making Notebooks Portable with Backpacks Across HPC Clusters",
        
        description: "Grad student Saiful Islam presented our paper “Backpacks for Notebooks: Enabling Containerized Notebook Workflows in Distributed Environments” at the 2025 IE…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/floability-at-escience-2025-making-notebooks-portable-with-backpacks-across-hpc/";
          
        },
      },{id: "post-workshop-on-harmonizing-python-workflows-at-ieee-e-science-2025",
        
          title: "Workshop on Harmonizing Python Workflows at IEEE e-Science 2025",
        
        description: "We helped host the Workshop on Harmonizing Python Workflows at IEEE International Conference on e-Science on Monday, 15 Sep 2025. This workshop is one compon…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/workshop-on-harmonizing-python-workflows-at-ieee-e-science-2025/";
          
        },
      },{id: "post-welcome-back-colin",
        
          title: "Welcome Back, Colin!",
        
        description: "This past summer, 4th year PhD student Colin Thomas completed an internship at the National Energy Research Scientific Computing Center (NERSC) located at th…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/welcome-back-colin/";
          
        },
      },{id: "post-new-semester-new-faces",
        
          title: "New Semester, New Faces",
        
        description: "The new semester is here, and we’re excited to welcome three new colleagues and roll out a clear plan for the months ahead. New faces. Lax joins as a first-y…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/new-semester-new-faces/";
          
        },
      },{id: "post-ccl-team-at-gcasr-2025",
        
          title: "CCL Team at GCASR 2025",
        
        description: "Members of the CCL team traveled to Chicago, Illinois on May 8 to attend GCASR 2025 (12th Greater Chicago Area Systems Research Workshop). CCL team members p…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ccl-team-at-gcasr-2025/";
          
        },
      },{id: "post-reshaping-high-energy-physics-applications-using-taskvine-sc24",
        
          title: "Reshaping High Energy Physics Applications Using TaskVine  @ SC24",
        
        description: "Barry Sly-Delgado presented our paper titled: &quot; Reshaping High Energy Physics Applications for Near-Interactive Execution Using TaskVine &quot; at the 2024 Superc…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/reshaping-high-energy-physics-applications-using-taskvine-sc24/";
          
        },
      },{id: "post-shepherd-paper-at-works-sc-2024",
        
          title: "Shepherd Paper at WORKS/SC 2024",
        
        description: "Grad student Saiful Islam presented our paper on Shepherd at the 19th Workshop on Workflows in Support of Large-Scale Science at Supercomputing 2024 in Atlan…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/shepherd-paper-at-workssc-2024/";
          
        },
      },{id: "post-data-pruning-mechanism-in-daskvine",
        
          title: "Data Pruning Mechanism in Daskvine",
        
        description: "In our recent work, we introduced a file pruning technique into DaskVine to address challenges in managing intermediate files in DAG-based task graphs. This …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/data-pruning-mechanism-in-daskvine/";
          
        },
      },{id: "post-taskvine-parsl-integration",
        
          title: "TaskVine + Parsl Integration",
        
        description: "The Cooperative Computing Lab team has an ongoing collaboration with the Parsl Project , maintaining the TaskVine Executor for use with the Parsl workflow sy…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/taskvine-parsl-integration/";
          
        },
      },{id: "post-accelerating-function-centric-applications-via-reusable-function-context-in-workflow-systems",
        
          title: "Accelerating Function-Centric Applications via Reusable Function Context in Workflow Systems",
        
        description: "Modern applications are increasingly being written in high-level programming languages (e.g., Python) via popular parallel frameworks (e.g., Parsl, TaskVine,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/accelerating-function-centric-applications-via-reusable-function-context-in-work/";
          
        },
      },{id: "post-a-new-visualization-tool-for-taskvine-released",
        
          title: "A New Visualization Tool for TaskVine Released",
        
        description: "We released a web-based tool to visualize runtime logs produced by TaskVine, available on Github . Using this tool involves two main steps. First, the requir…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/a-new-visualization-tool-for-taskvine-released/";
          
        },
      },{id: "post-integrating-taskvine-with-merlin",
        
          title: "Integrating TaskVine with Merlin",
        
        description: "Graduate student, Barry Sly-Delgado , completed a summer internship onsite at Lawrence Livermore National Laboratory where he worked on integrating TaskVine …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/integrating-taskvine-with-merlin/";
          
        },
      },{id: "post-introducing-shepherd-simplifying-integration-of-service-workflows-into-task-based-workflows",
        
          title: "Introducing Shepherd: Simplifying Integration of Service Workflows into Task-Based Workflows",
        
        description: "We are pleased to announce the release of Shepherd , an open-source tool designed to streamline the integration of service workflows into task-based workflow…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/introducing-shepherd-simplifying-integration-of-service-workflows-into-task-base/";
          
        },
      },{id: "post-taskvine-at-parslfest-2024",
        
          title: "TaskVine at ParslFest 2024",
        
        description: "On September 26-27 members of the CCL team attended ParslFest 2024 in Chicago, Illinois to speak about TaskVine and connect with our ongoing collaborators at…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/taskvine-at-parslfest-2024/";
          
        },
      },{id: "post-predicting-resources-of-tasks-in-dynamic-workflows-with-bucketing-algorithms-at-ipdps-2024",
        
          title: "Predicting Resources of Tasks in Dynamic Workflows with Bucketing Algorithms at IPDPS 2024...",
        
        description: "Thanh Son Phung will present Adaptive Task-Oriented Resource Allocation for Large Dynamic Workflows on Opportunistic Resources at the International Parallel …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/predicting-resources-of-tasks-in-dynamic-workflows-with-bucketing-algorithms-at/";
          
        },
      },{id: "post-taskvine-at-the-hep-analysis-grand-challenge",
        
          title: "TaskVine at the HEP Analysis Grand Challenge",
        
        description: "Barry Sly-Delgado and Ben Tovar recently presented our work on transforming high energy physics data analysis applications into near-interactive execution at…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/taskvine-at-the-hep-analysis-grand-challenge/";
          
        },
      },{id: "post-cctools-7-8-0-released",
        
          title: "CCTools 7.8.0 released",
        
        description: "We are pleased to announce the release of version 7.8.0 of the Cooperative Computing Tools from the University of Notre Dame, including TaskVine, Work Queu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/cctools-780-released/";
          
        },
      },{id: "post-untitled",
        
          title: "Untitled",
        
        description: "TaskVine Blog Notes Mini-Task Handling Data Distribution Techniques Tradeoffs in Robustness to Failure Rapid Dispatch and Recovery",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/untitled/";
          
        },
      },{id: "post-distant-futures-at-sc-2023",
        
          title: "Distant Futures at SC 2023",
        
        description: "Grad student Barry Sly-Delgado presented his recent work on &quot; Minimizing Data Movement Using Distant Futures &quot; at the research poster session at Supercomputi…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/distant-futures-at-sc-2023/";
          
        },
      },{id: "post-maximizing-data-utility-at-hppss-sc-2023",
        
          title: "Maximizing Data Utility at HPPSS/SC 2023",
        
        description: "Thanh Son Phung presented Maximizing Data Utility for HPC Python Workflow Execution at the High Performance Python for Science at Scale workshop at Supercomp…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/maximizing-data-utility-at-hppsssc-2023/";
          
        },
      },{id: "post-taskvine-paper-at-works-sc-2023",
        
          title: "TaskVine Paper at WORKS/SC 2023",
        
        description: "Barry Sly-Delgado presented our overview paper on TaskVine at the Workshop on Workflows in Support of Large Scale Science at Supercomputing 2023 in Denver, C…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/taskvine-paper-at-workssc-2023/";
          
        },
      },{id: "post-cctools-7-7-0-released",
        
          title: "CCTools 7.7.0 Released",
        
        description: "We are pleased to announce the release of version 7.7. of the Cooperative Computing Tools from the University of Notre Dame, including TaskVine, Work Queue, …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/cctools-770-released/";
          
        },
      },{id: "post-cctools-7-6-1-released",
        
          title: "CCTools 7.6.1 Released",
        
        description: "We are pleased to announce the release of version 7.6.1 of the Cooperative Computing Tools from the University of Notre Dame, including TaskVine, Work Queue,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/cctools-761-released/";
          
        },
      },{id: "post-cctools-7-6-0-released",
        
          title: "CCTools 7.6.0 Released",
        
        description: "We are pleased to announce the release of version 7.6.0 of the Cooperative Computing Tools from the University of Notre Dame, including TaskVine, Work Queue,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/cctools-760-released/";
          
        },
      },{id: "post-intro-to-taskvine-at-gcasr-2023",
        
          title: "Intro to TaskVine at GCASR 2023",
        
        description: "Prof. Thain gave the afternoon keynote ( Data Intensive Computing with TaskVine ) at the GCASR Workshop in Chicago on April 24th.  TaskVine is our latest wor…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/intro-to-taskvine-at-gcasr-2023/";
          
        },
      },{id: "post-cctools-version-7-5-2-released",
        
          title: "CCTools version 7.5.2 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.5.2 of the Cooperative Computing Tools including TaskVine, WorkQueue, Makefl…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/cctools-version-752-released/";
          
        },
      },{id: "post-taskvine-system-architecture",
        
          title: "TaskVine System Architecture",
        
        description: "TaskVine is our newest framework for building large scale data intensive dynamic workflows.  This is the second in a series of posts giving a brief introduct…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/taskvine-system-architecture/";
          
        },
      },{id: "post-a-preview-of-taskvine",
        
          title: "A Preview of TaskVine",
        
        description: "We have seemed a bit quiet in the Cooperative Computing Lab lately, as we have been focused on building TaskVine , our new system for executing dynamic data …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/a-preview-of-taskvine/";
          
        },
      },{id: "post-landlord-container-paper-in-tpds-2023",
        
          title: "Landlord Container Paper in TPDS 2023",
        
        description: "Our latest work on container management was recently accepted to IEEE TPDS: LANDLORD: Coordinating Dynamic Software Environments to Reduce Container Sprawl h…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/landlord-container-paper-in-tpds-2023/";
          
        },
      },{id: "post-mufasa-robust-meta-workflow-management-at-escience-2022",
        
          title: "Mufasa: Robust Meta-Workflow Management at eScience 2022",
        
        description: "This week, I&#39;ll be presenting Ben Lyon&#39;s M.S. project work on Mufasa at the eScience 2022 conference in Salt Lake City.   Mufasa is a meta-workflow manager t…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/mufasa-robust-meta-workflow-management-at-escience-2022/";
          
        },
      },{id: "post-pyhep-2022-automatic-resource-management-with-coffea-and-workqueue",
        
          title: "pyHEP 2022: Automatic resource management with Coffea and WorkQueue",
        
        description: "pyHEP is a virtual workshop to discuss the use of python in the High Energy Physics community. In this year pyHEP (2022), we showcased the resource managemen…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/pyhep-2022-automatic-resource-management-with-coffea-and-workqueue/";
          
        },
      },{id: "post-us-cms-pursue-internship-project-searching-for-extreme-events-in-multi-lepton-data-from-the-lhc",
        
          title: "US-CMS PURSUE internship project: Searching for Extreme Events in Multi-lepton Data from the...",
        
        description: "As part of the US-CMS PURSUE summer internship project, we hosted Xinyue Wu, a rising junior from the University of Rochester. The purpose of the internship …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/us-cms-pursue-internship-project-searching-for-extreme-events-in-multi-lepton-da/";
          
        },
      },{id: "post-demo-of-the-work-queue-executor-at-coffea-user-39-s-meeting",
        
          title: "Demo of the Work Queue executor at Coffea User&#39;s meeting",
        
        description: "Last August 15, 2022 we gave a demonstration on how to use Coffea using the Work Queue executor. Coffea is a framework for pulling together all the typical n…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/demo-of-the-work-queue-executor-at-coffea-users-meeting/";
          
        },
      },{id: "post-isure-project-visualizing-and-right-sizing-work-queue-applications",
        
          title: "iSURE Project: Visualizing and Right Sizing Work Queue Applications",
        
        description: "Samuel Huang , an exchange student in the iSURE program, recently completed a summer project with the Cooperative Computing Lab at the University of Notre Da…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/isure-project-visualizing-and-right-sizing-work-queue-applications/";
          
        },
      },{id: "post-reu-project-topeft-performance-analysis-solving-bottlenecks-in-data-transfer-and-task-resource-management",
        
          title: "REU Project: TopEFT Performance Analysis: Solving Bottlenecks in Data Transfer and Task Resource...",
        
        description: "Andrew Hennessy, a junior at Notre Dame, recently completed a summer REU project in which he analyzed and improved the performance of TopEFT, a high energy p…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/reu-project-topeft-performance-analysis-solving-bottlenecks-in-data-transfer-and/";
          
        },
      },{id: "post-reu-project-integrating-serverless-and-task-computation-in-work-queue",
        
          title: "REU Project: Integrating Serverless and Task Computation in Work Queue",
        
        description: "David Simonetti, a junior undergraduate at Notre Dame, recently completed a summer REU project in which he added &quot;serverless&quot; computing capabilities to the W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/reu-project-integrating-serverless-and-task-computation-in-work-queue/";
          
        },
      },{id: "post-cctools-version-7-4-9-released",
        
          title: "CCTools version 7.4.9 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.4.9 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/cctools-version-749-released/";
          
        },
      },{id: "post-how-many-eggs-can-you-fit-in-one-nest",
        
          title: "How Many Eggs Can You Fit In One Nest?",
        
        description: "Prof. Thain gave a talk at HTCondor Week 2022, giving an overview of some of our recent work on resource management in high throughput scientific workflows. …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/how-many-eggs-can-you-fit-in-one-nest/";
          
        },
      },{id: "post-ipdps-paper-dynamic-task-shaping-in-high-energy-physics",
        
          title: "IPDPS Paper: Dynamic Task Shaping ... in High Energy Physics",
        
        description: "In an upcoming paper to be presented at IPDPS 2022, we discuss our experience with designing and executing high throughput data intensive applications for hi…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/ipdps-paper-dynamic-task-shaping-in-high-energy-physics/";
          
        },
      },{id: "post-continuous-integration-for-documentation",
        
          title: "Continuous Integration for Documentation",
        
        description: "Continuous Integration for Documentation Consider the following situation: you are desperately looking for a program to accomplish some obscure task, and aft…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/continuous-integration-for-documentation/";
          
        },
      },{id: "post-scaling-up-julia-hidden-filesystem-stress",
        
          title: "Scaling Up Julia: Hidden Filesystem Stress",
        
        description: "HTCondor Cluster View In the CCL , we study the design and implementation of scalable systems and applications that run on very large computing systems.  It …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/scaling-up-julia-hidden-filesystem-stress/";
          
        },
      },{id: "post-tuning-high-throughput-task-dispatch-in-coffea",
        
          title: "Tuning High Throughput Task Dispatch in Coffea",
        
        description: "Consider a distributed application that looks like this: the manager creates an arbitrary number of tasks initially, new tasks are created as tasks complete,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/tuning-high-throughput-task-dispatch-in-coffea/";
          
        },
      },{id: "post-scalable-molecular-dynamics-with-work-queue-at-ut-austin",
        
          title: "Scalable Molecular Dynamics with Work Queue at UT-Austin",
        
        description: "The Biomolecular Engineering Lab at UT-Austin routinely requires large scale molecular dynamics for predicting ligand-protein binding affinity.  The lab make…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/scalable-molecular-dynamics-with-work-queue-at-ut-austin/";
          
        },
      },{id: "post-jx-language-repl-tool-and-dot-operator",
        
          title: "JX Language:  REPL Tool and Dot Operator",
        
        description: "Undergraduate student Jack Rundle has been making improvements to the JX language used throughout the CCTools package for expressing workflows, database quer…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/jx-language-repl-tool-and-dot-operator/";
          
        },
      },{id: "post-poncho-toolkit-for-portable-python",
        
          title: "PONCHO Toolkit for Portable Python",
        
        description: "PONCHO ,  is  a  lightweight  Python  based toolkit  which  allows  users  to  synthesize  environments  from a concise, human-readable JSON file containing …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/poncho-toolkit-for-portable-python/";
          
        },
      },{id: "post-works-paper-adaptive-resource-allocation-for-heterogeneous-tasks-in-dynamic-workflows",
        
          title: "WORKS Paper: Adaptive Resource Allocation for Heterogeneous Tasks in Dynamic Workflows",
        
        description: "CCL graduate student Thanh Son Phung will be presenting his recent work on managing dynamic tasks at the WORKS workshop at Supercomputing 2021: Dynamic workf…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/works-paper-adaptive-resource-allocation-for-heterogeneous-tasks-in-dynamic-work/";
          
        },
      },{id: "post-new-pythontask-interface-in-work-queue",
        
          title: "New PythonTask Interface in Work Queue",
        
        description: "The most recent version of Work Queue supports two different categories of tasks. Standard Task s describe a Unix command line and corresponding files, just …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/new-pythontask-interface-in-work-queue/";
          
        },
      },{id: "post-harnessing-hpc-at-user-level-for-high-energy-physics",
        
          title: "Harnessing HPC at User Level for High Energy Physics",
        
        description: "Ben Tovar presented some recent work at the (virtual) CHEP 2021 conference: &quot;Harnessing HPC Resources for CMS Jobs Using a Virtual Private Network&quot; . The fut…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/harnessing-hpc-at-user-level-for-high-energy-physics/";
          
        },
      },{id: "post-new-ccl-swag",
        
          title: "New CCL Swag!",
        
        description: "Check out the new CCL swag! Send us a brief note of how you use Work Queue or Makeflow to scale up your computational work, and we&#39;ll send you some laptop st…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/new-ccl-swag/";
          
        },
      },{id: "post-cctools-version-7-3-0-released",
        
          title: "CCTools Version 7.3.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.3.0 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/cctools-version-730-released/";
          
        },
      },{id: "post-lightweight-function-paper-at-ipdps",
        
          title: "Lightweight Function Paper at IPDPS",
        
        description: "Tim Shaffer, a Ph.D student in the CCL, will be presenting a paper &quot; Lightweight Function Monitors for Fine-Grained Management in Large Scale Python Applicat…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/lightweight-function-paper-at-ipdps/";
          
        },
      },{id: "post-ph-d-defense-nathaniel-kremer-herman",
        
          title: "Ph.D. Defense - Nathaniel Kremer-Herman",
        
        description: "Congratulations to Dr. Kremer-Herman, who successfully defended his Ph.D. dissertation &quot;Log Discovery, Log Custody, and the Web Inspired Approach for Open Di…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/phd-defense-nathaniel-kremer-herman/";
          
        },
      },{id: "post-cctools-7-2-0-released",
        
          title: "CCTools 7.2.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.2.0 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/cctools-720-released/";
          
        },
      },{id: "post-cctools-version-7-1-12-released",
        
          title: "CCTools version 7.1.12 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.12 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-version-7112-released/";
          
        },
      },{id: "post-opentopography-eemt-makeflow",
        
          title: "OpenTopography + EEMT + Makeflow",
        
        description: "The OpenTopography service provides online access to geospatial data and computational tools in support of earth sciences.  The Effective Energy and Mass Tra…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/opentopography-eemt-makeflow/";
          
        },
      },{id: "post-analyzing-agriculture-with-work-queue",
        
          title: "Analyzing Agriculture with Work Queue",
        
        description: "The Field Scanalyzer at the University of Arizona is a massive robot that uses sensors, cameras, and GPS devices to collect vast quantities of agricultural d…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/analyzing-agriculture-with-work-queue/";
          
        },
      },{id: "post-now-recruiting-students",
        
          title: "Now Recruiting Students",
        
        description: "Research Opportunities in the Cooperative Computing Lab Join the CCL team and work on challenging problems in the realm of parallel and distributed systems! …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/now-recruiting-students/";
          
        },
      },{id: "post-cctools-version-7-1-9-released",
        
          title: "CCTools version 7.1.9 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.9 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-version-719-released/";
          
        },
      },{id: "post-autoscaling-htc-at-cluster-2020",
        
          title: "Autoscaling HTC at CLUSTER 2020",
        
        description: "Recent CCL graduate Charles Zheng, Ph.D., presented his paper &quot;Autoscaling High Throughput Workloads on Container Orchestrators&quot; at the CLUSTER 2020 conferen…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/autoscaling-htc-at-cluster-2020/";
          
        },
      },{id: "post-cctools-version-7-1-7-released",
        
          title: "CCTools version 7.1.7 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.7 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-version-717-released/";
          
        },
      },{id: "post-resource-usage-histograms-for-work-queue-using-python-39-s-pandas-matplotlib",
        
          title: "Resource usage histograms for Work Queue using python&#39;s pandas+matplotlib",
        
        description: "Work Queue is a framework to write and execute master-worker applications. A master process that can be written in python, perl, or C generates the tasks tha…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/resource-usage-histograms-for-work-queue-using-pythons-pandasmatplotlib/";
          
        },
      },{id: "post-tim-shaffer-awarded-doe-fellowship",
        
          title: "Tim Shaffer Awarded DOE Fellowship",
        
        description: "CCL grad student Tim Shaffer was recently awarded a DOE SCGSR fellowship for his work titled &quot;Enabling Distributed HPC for Loosely‐Coupled Dataflow Applicati…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/tim-shaffer-awarded-doe-fellowship/";
          
        },
      },{id: "post-wrench-simulation-of-work-queue",
        
          title: "WRENCH Simulation of Work Queue",
        
        description: "Our colleagues Henri Casanova (U Hawaii) and Rafael Ferreira da Silva (USC), along with their students, have recently published a paper highlighting their wo…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/wrench-simulation-of-work-queue/";
          
        },
      },{id: "post-coffea-work-queue-presentation-at-pyhep-2020",
        
          title: "Coffea + Work Queue Presentation at PyHEP 2020",
        
        description: "CCL grad student Cami Carballo gave an interactive notebook talk on scaling up data analysis workloads at the PyHEP 2020 conference on Python for high energy…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/coffea-work-queue-presentation-at-pyhep-2020/";
          
        },
      },{id: "post-troubleshooting-at-pearc-2020",
        
          title: "Troubleshooting at PEARC 2020",
        
        description: "CCL grad student Nate Kremer-Herman presented his work on troubleshooting distributed systems at the PEARC 2020 conference: Nathaniel Kremer-Herman and Dougl…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/troubleshooting-at-pearc-2020/";
          
        },
      },{id: "post-container-management-at-ipdps-2020",
        
          title: "Container Management at IPDPS 2020",
        
        description: "CCL grad student Tim Shaffer recently presented his recent work on container management at IPDPS 2020: Container technologies are seeing wider use at advanc…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/container-management-at-ipdps-2020/";
          
        },
      },{id: "post-bootstrapping-the-bootstrapper",
        
          title: "Bootstrapping the Bootstrapper",
        
        description: "Much of our recent work has involved running Python applications at scale. While Python itself has pretty mediocre performance, it does make a convenient lan…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/bootstrapping-the-bootstrapper/";
          
        },
      },{id: "post-cctools-version-7-1-6-released",
        
          title: "CCTools version 7.1.6 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.6 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-version-716-released/";
          
        },
      },{id: "post-reu-project-coffea-work-queue",
        
          title: "REU Project: Coffea + Work Queue",
        
        description: "This spring, undergraduate researchers Zoe Surma and Emily Strout worked to integrate the Coffea data analysis framework for high energy physics with the Wor…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/reu-project-coffea-work-queue/";
          
        },
      },{id: "post-cctools-version-7-1-5-released",
        
          title: "CCTools version 7.1.5 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.5 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-version-715-released/";
          
        },
      },{id: "post-cctools-version-7-1-2-released",
        
          title: "CCTools version 7.1.2 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.2 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-version-712-released/";
          
        },
      },{id: "post-cctools-7-1-0-released",
        
          title: "CCTools 7.1.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.1.0 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/cctools-710-released/";
          
        },
      },{id: "post-announcement-cctools-version-7-0-22-released",
        
          title: "Announcement: CCTools version 7.0.22 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.0.22 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/announcement-cctools-version-7022-released/";
          
        },
      },{id: "post-ph-d-defense-nick-hazekamp",
        
          title: "Ph.D. Defense: Nick Hazekamp",
        
        description: "Nick Hazekamp successfully defended his Ph.D. dissertation titled &quot;Methods Enabling Portability of Scientific Workflows&quot;.  He has recently started a job at A…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/phd-defense-nick-hazekamp/";
          
        },
      },{id: "post-announcement-cctools-version-7-0-21-released",
        
          title: "Announcement: CCTools version 7.0.21 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.0.21 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/announcement-cctools-version-7021-released/";
          
        },
      },{id: "post-acic-tutorial-on-makeflow-and-work-queue",
        
          title: "ACIC Tutorial on Makeflow and Work Queue",
        
        description: "We enjoyed giving a tutorial on Building Scalable Applications with Makeflow and Work Queue for the Advanced Cyberinfrastructure taught by Nirav Merchant at …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/acic-tutorial-on-makeflow-and-work-queue/";
          
        },
      },{id: "post-readthedocs-preview",
        
          title: "ReadTheDocs Preview",
        
        description: "We are migration our documentation to the online ReadTheDocs service, which offers an improved style and better navigation.  Check out the preview here: ccto…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/readthedocs-preview/";
          
        },
      },{id: "post-work-queue-parsl-preview",
        
          title: "Work Queue + Parsl Preview",
        
        description: "Prof. Thain presented some recent work by TJ Dasso (ND senior), Andrew Litteken (recent ND grad), and Ben Tovar (current ND staff) on integrating Work Queue …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/work-queue-parsl-preview/";
          
        },
      },{id: "post-announcement-cctools-7-0-17-released",
        
          title: "Announcement: CCTools 7.0.17 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.0.17 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/announcement-cctools-7017-released/";
          
        },
      },{id: "post-ph-d-defense-chao-quot-charles-quot-zheng",
        
          title: "Ph.D. Defense: Chao &quot;Charles&quot; Zheng",
        
        description: "Congratulations to Dr. Chao &quot;Charles&quot; Zheng, who defended his Ph.D. thesis on &quot;The Challenges of Scaling Up High Throughput Workflows with Container Technolo…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/phd-defense-chao-charles-zheng/";
          
        },
      },{id: "post-summer-reu-projects",
        
          title: "Summer REU Projects",
        
        description: "In summer 2019, REU students TJ Dasso and Eamon Marmion worked at the CCL on large scale distributed applications.  They completed the integration between th…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/summer-reu-projects/";
          
        },
      },{id: "post-phd-proposal-tim-shaffer",
        
          title: "PhD Proposal: Tim Shaffer",
        
        description: "Congrads to Tim Shaffer on passing the PhD candidacy proposal stage: &quot;Proactive Storage Management for High Throughput Scientific Workloads&quot;",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/phd-proposal-tim-shaffer/";
          
        },
      },{id: "post-shrinkwrap-containers-at-cern",
        
          title: "Shrinkwrap Containers at CERN",
        
        description: "Tim Shaffer attended the 2019 CVMFS Workshop and presented &quot; Shrinkwrap: Creating HPC Containers &quot;, work done together with Nick Hazekamp.  Shrinkwrap is a t…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/shrinkwrap-containers-at-cern/";
          
        },
      },{id: "post-announcement-cctools-7-0-11-released",
        
          title: "Announcement: CCTools 7.0.11 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.0.11 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/announcement-cctools-7011-released/";
          
        },
      },{id: "post-ph-d-proposal-nate-kremer-herman",
        
          title: "Ph.D. Proposal: Nate Kremer-Herman",
        
        description: "Congrads to Nate Kremer-Herman who passed his Ph.D. proposal, titled &quot;Troubleshooting Distributed Applications Using a Graph Representation&quot;",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/phd-proposal-nate-kremer-herman/";
          
        },
      },{id: "post-parallel-application-capacity-paper-at-supercomputing-2018",
        
          title: "Parallel Application Capacity Paper at Supercomputing 2018",
        
        description: "Nate Kremer-Herman presented the paper A Lightweight Model for Right-Sizing Master-Worker Applications at the ACM/IEEE International Conference for High Perf…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/parallel-application-capacity-paper-at-supercomputing-2018/";
          
        },
      },{id: "post-workflow-algebra-and-jx-language-at-e-science-2018",
        
          title: "Workflow Algebra and JX Language at e-Science 2018",
        
        description: "Nick Hazekamp presented the paper An Algebra for Robust Workflow Transformations and Tim Shaffer presented a poster on A First Look at the JX Workflow Langua…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/workflow-algebra-and-jx-language-at-e-science-2018/";
          
        },
      },{id: "post-work-queue-visual-status",
        
          title: "Work Queue Visual Status",
        
        description: "Check out the new Work Queue Status page by Nate Kremer-Herman.  This reveals a whole lot of information that was already reported to the global catalog in r…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/work-queue-visual-status/";
          
        },
      },{id: "post-announcement-cctools-7-0-4-released",
        
          title: "Announcement: CCTools 7.0.4 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.0.4 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/announcement-cctools-704-released/";
          
        },
      },{id: "post-disc-reu-videos-2018",
        
          title: "DISC REU Videos 2018",
        
        description: "Our summer REU students in the DISC program produced an impressive set of videos describing their summer research projects -- check out the playlist!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/disc-reu-videos-2018/";
          
        },
      },{id: "post-vc3-virtual-clusters-at-pearc-2018",
        
          title: "VC3 - Virtual Clusters at PEARC 2018",
        
        description: "The VC3 project (virtualclusters.org) allows end users to dynamically create virtual clusters with custom software and middleware, running on top of existing…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/vc3-virtual-clusters-at-pearc-2018/";
          
        },
      },{id: "post-reproducibility-in-scientific-computing",
        
          title: "Reproducibility in Scientific Computing",
        
        description: "&quot; Reproducibility in Scientific Computing &quot;, an article by (recent grad) Peter Ivie recently appeared in the journal ACM Computing Surveys.  This article giv…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/reproducibility-in-scientific-computing/";
          
        },
      },{id: "post-halfway-through-2018-summer-reu",
        
          title: "Halfway Through 2018 Summer REU",
        
        description: "We are a little more than halfway through the 2018 edition of our summer Data Intensive Scientific Computing REU program at the University of Notre Dame.  Th…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/halfway-through-2018-summer-reu/";
          
        },
      },{id: "post-announcement-cctools-7-0-0-released",
        
          title: "Announcement: CCTools 7.0.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 7.0.0 of the Cooperative Computing Tools including Parrot, Chirp, JX, Makeflow, W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/announcement-cctools-700-released/";
          
        },
      },{id: "post-papers-at-sciencecloud-workshop",
        
          title: "Papers at ScienceCloud Workshop",
        
        description: "CCL grad student Kyle Sweeney is presenting two papers at the ScienceCloud/IWAC workshop at HPDC 2018. Early Experience Using Amazon Batch for Scientific Wor…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/papers-at-sciencecloud-workshop/";
          
        },
      },{id: "post-ccl-internships-at-cern-and-alibaba",
        
          title: "CCL Internships at CERN and Alibaba",
        
        description: "Two of our CCL grad students are off to internships this summer: Nick Hazekamp will be in Geneva at CERN working with Jakob Blomer and the CVMFS group to dev…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/ccl-internships-at-cern-and-alibaba/";
          
        },
      },{id: "post-2018-disc-reu-kickoff",
        
          title: "2018 DISC REU Kickoff",
        
        description: "Our 2018 summer program in Data Intensive Scientific Computing (DISC) is underway at the University of Notre Dame.  Eleven students from all around the count…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/2018-disc-reu-kickoff/";
          
        },
      },{id: "post-vc3-project-limited-beta-opens",
        
          title: "VC3 Project Limited Beta Opens",
        
        description: "Ben Tovar gave a talk introducing the VC3 ( Virtual Clusters for Community Computation ) project at the annual HTCondor Wee k conference. VC3 makes it easy f…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/vc3-project-limited-beta-opens/";
          
        },
      },{id: "post-graduation-2018",
        
          title: "Graduation 2018",
        
        description: "It was a busy graduation weekend here at Notre Dame! The CSE department graduated nineteen PhD students, including CCL grads Dr. Peter Ivie and Dr. James S…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/graduation-2018/";
          
        },
      },{id: "post-vc3-builder-and-wq-maker-at-ic2e-2018",
        
          title: "VC3-Builder and WQ-MAKER at IC2E 2018",
        
        description: "Ben Tovar presented the paper Automatic Dependency Management for Scientific Applications on Clusters and Nick Hazekamp presented the paper MAKER as a Servic…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/vc3-builder-and-wq-maker-at-ic2e-2018/";
          
        },
      },{id: "post-ccl-at-cyverse-container-camp",
        
          title: "CCL at CyVerse Container Camp",
        
        description: "Nick Hazekamp and Kyle Sweeney gave a talk, &quot;Distributed Computing with Makeflow and Work Queue&quot;, at the CyVerse Container Camp workshop. This talk gives a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2018/ccl-at-cyverse-container-camp/";
          
        },
      },{id: "post-tpds-paper-storage-management-in-makeflow",
        
          title: "TPDS Paper: Storage Management in Makeflow",
        
        description: "As the scale of workflows and their data grow, it becomes increasingly difficult to execute within the provide storage. This issue is only exacerbated when…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/tpds-paper-storage-management-in-makeflow/";
          
        },
      },{id: "post-ccl-on-chameleon-cloud-with-acic",
        
          title: "CCL on Chameleon Cloud with ACIC",
        
        description: "As has been a tradition for several years, the CCL has had the opportunity to teach about the CCTools and distributed computing as part of Applied Cyberinfra…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/ccl-on-chameleon-cloud-with-acic/";
          
        },
      },{id: "post-ccl-at-supercomputing-2017",
        
          title: "CCL at Supercomputing 2017",
        
        description: "We are well represented at the annual Supercomputing conference this week: Tim Shaffer is presenting &quot; Taming Metadata Storms in Parallel Filesystems with Me…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/ccl-at-supercomputing-2017/";
          
        },
      },{id: "post-tpds-paper-job-sizing",
        
          title: "TPDS Paper: Job Sizing",
        
        description: "When submitting jobs for execution to a computing facility, a user must make a critical decision: how many resources (such as cores, memory and disk) should …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/tpds-paper-job-sizing/";
          
        },
      },{id: "post-makeflow-feature-jx-representation",
        
          title: "Makeflow Feature: JX Representation",
        
        description: "There are a number of neat new features in the latest versions of our software that I would like to highlight through some occasional blog posts.  If these s…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/makeflow-feature-jx-representation/";
          
        },
      },{id: "post-announcement-cctools-6-2-0-released",
        
          title: "Announcement: CCTools 6.2.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 6.2.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/announcement-cctools-620-released/";
          
        },
      },{id: "post-2017-disc-summer-reu-conclusion",
        
          title: "2017 DISC Summer REU Conclusion",
        
        description: "This summer, we hosted 9 outstanding undergraduate students in our summer REU program in Data Intensive Scientific Computing (DISC).  Our guests spent the su…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/2017-disc-summer-reu-conclusion/";
          
        },
      },{id: "post-announcement-cctools-6-1-6-released",
        
          title: "Announcement: CCTools 6.1.6 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 6.1.6 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/announcement-cctools-616-released/";
          
        },
      },{id: "post-talk-at-sciencecloud-workshop",
        
          title: "Talk at ScienceCloud Workshop",
        
        description: "Prof. Thain gave the opening talk, &quot; Seamless Scientific Computing from Laptops to Cloud s&quot;, at the ScienceCloud workshop preceding High Performance Distribu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/talk-at-sciencecloud-workshop/";
          
        },
      },{id: "post-congrads-to-ph-d-graduates",
        
          title: "Congrads to Ph.D Graduates",
        
        description: "Congratulations to all of our 2017 Ph.D. graduates in Computer Science and Engineering, and especially to Dr. Haiyan Meng who is moving on to a position at G…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/congrads-to-phd-graduates/";
          
        },
      },{id: "post-announcement-cctools-6-1-0-released",
        
          title: "Announcement: CCTools 6.1.0. released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 6.1.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/announcement-cctools-610-released/";
          
        },
      },{id: "post-makeflow-and-mesos-paper-at-ccgrid-2017",
        
          title: "Makeflow and Mesos Paper at CCGrid 2017",
        
        description: "Charles Zheng will present the paper Deploying High Throughput Scientific Workflows on Container Schedulers with Makeflow and Mesos at the 17th IEEE/ACM Inte…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/makeflow-and-mesos-paper-at-ccgrid-2017/";
          
        },
      },{id: "post-workflow-reproducibility-paper-at-iccs-2017",
        
          title: "Workflow Reproducibility Paper at ICCS 2017",
        
        description: "Haiyan Meng will present a paper titled Facilitating the Reproducibility of Scientific Workflows with Execution Environment Specifications at the Internation…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/workflow-reproducibility-paper-at-iccs-2017/";
          
        },
      },{id: "post-ph-d-defense-haiyan-meng",
        
          title: "Ph.D. Defense: Haiyan Meng",
        
        description: "Haiyan Meng successfully defended her dissertation titled &quot;Improving the Reproducibility of Scientific Applications with Execution Environment Specifications…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/phd-defense-haiyan-meng/";
          
        },
      },{id: "post-makeflow-examples-archive",
        
          title: "Makeflow Examples Archive",
        
        description: "We recently updated our archive of example Makeflows so that they are significantly easier to download, execute, and reshape to various sizes.   For each one…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/makeflow-examples-archive/";
          
        },
      },{id: "post-big-cms-data-analysis-at-notre-dame",
        
          title: "Big CMS Data Analysis at Notre Dame",
        
        description: "Analyzing the data produced by the Compact Muon Solenoid (CMS), one of the experiments at the Large Hadron Collider , requires a collaboration of physicists,…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/big-cms-data-analysis-at-notre-dame/";
          
        },
      },{id: "post-icecube-flies-with-parrot-and-cvmfs",
        
          title: "IceCube Flies with Parrot and CVMFS",
        
        description: "IceCube is a neutrino detector built at the South Pole by instrumenting about a cubic kilometer of ice with 5160 light sensors. The IceCube data is analyzed …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2017/icecube-flies-with-parrot-and-cvmfs/";
          
        },
      },{id: "post-reproducibility-papers-at-escience-2016",
        
          title: "Reproducibility Papers at eScience 2016",
        
        description: "CCL students presented two papers at the IEEE 12th International Conference on eScience on the theme of reproducibility in computational science: Haiyan Meng…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/reproducibility-papers-at-escience-2016/";
          
        },
      },{id: "post-ccl-workshop-2016",
        
          title: "CCL Workshop 2016",
        
        description: "The 2016 CCL Workshop on Scalable Scientific Computing was held on October 19-20 at the University of Notre Dame.  We offered tutorials on Makeflow, Work Que…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/ccl-workshop-2016/";
          
        },
      },{id: "post-nsf-grant-to-support-cctools-development",
        
          title: "NSF Grant to Support CCTools Development",
        
        description: "We are pleased to announce that our work will continue to be supported by the National Science Foundation through the division of Advanced Cyber Infrastructu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/nsf-grant-to-support-cctools-development/";
          
        },
      },{id: "post-announcement-cctools-6-0-0-released",
        
          title: "Announcement:  CCTools 6.0.0. released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 6.0.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/announcement-cctools-600-released/";
          
        },
      },{id: "post-summer-reu-projects-in-data-intensive-scientific-computing",
        
          title: "Summer REU Projects in Data Intensive Scientific Computing",
        
        description: "We recently wrapped up the first edition of the summer REU in Data Intensive Scientific Computing at the University of Notre Dame.  Ten undergraduate student…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/summer-reu-projects-in-data-intensive-scientific-computing/";
          
        },
      },{id: "post-simulation-of-hp24stab-with-awe-and-work-queue",
        
          title: "Simulation of HP24stab with AWE and Work Queue",
        
        description: "The villin headpiece subdomain &quot;HP24stab&quot; is a recently discovered 24-residue stable supersecondary structure that consists of two helices joined by a turn. …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/simulation-of-hp24stab-with-awe-and-work-queue/";
          
        },
      },{id: "post-nd-leads-doe-grant-on-virtual-clusters-for-scientific-computing",
        
          title: "ND Leads DOE Grant on Virtual Clusters for Scientific Computing",
        
        description: "Prof. Douglas Thain is leading a new $2.2M DOE-funded project titled &quot; VC3: Virtual Clusters for Community Computation &quot; in an effort to make our national su…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/nd-leads-doe-grant-on-virtual-clusters-for-scientific-computing/";
          
        },
      },{id: "post-2016-disc-summer-session-wraps-up",
        
          title: "2016 DISC Summer Session Wraps Up",
        
        description: "Congratulations to our first class of summer students participating in the Data Intensive Scientific Computing research experience!  Twelve students from aro…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/2016-disc-summer-session-wraps-up/";
          
        },
      },{id: "post-new-work-queue-visualization",
        
          title: "New Work Queue Visualization",
        
        description: "Nate Kremer-Herman has created a new, convenient way to lookup information of Work Queue masters. This new visualization tool provides real-time updates on t…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/new-work-queue-visualization/";
          
        },
      },{id: "post-work-queue-from-raspberry-pi-to-azure-at-spu",
        
          title: "Work Queue from Raspberry Pi to Azure at SPU",
        
        description: "&quot;At Seattle Pacific University we have used Work Queue in the CSC/CPE 4760 Advanced Computer Architecture course in Spring 2014 and Spring 2016.  Work Queu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/work-queue-from-raspberry-pi-to-azure-at-spu/";
          
        },
      },{id: "post-lifemapper-analyzes-biodiversity-using-makeflow-and-work-queue",
        
          title: "Lifemapper analyzes biodiversity using Makeflow and Work Queue",
        
        description: "Lifemapper is a high-throughput, webservice-based, single- and multi-species modeling and analysis system designed at the Biodiversity Institute and Natural …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/lifemapper-analyzes-biodiversity-using-makeflow-and-work-queue/";
          
        },
      },{id: "post-condor-week-2016-presentation",
        
          title: "Condor Week 2016 presentation",
        
        description: "We presented in Condor Week 2016 our approach to create a comprehensive resource feedback loop to execute tasks of unknown size. In this feedback look, tasks…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/condor-week-2016-presentation/";
          
        },
      },{id: "post-containers-workflows-and-reproducibility",
        
          title: "Containers, Workflows, and Reproducibility",
        
        description: "The DASPOS project hosted a workshop on Container Strategies for Data and Software Preservation that Promote Open Science at Notre Dame on May 19-20, 2016.  …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/containers-workflows-and-reproducibility/";
          
        },
      },{id: "post-balancing-push-and-pull-in-confuga-an-active-storage-cluster-file-system-for-scientific-workflows",
        
          title: "Balancing Push and Pull in Confuga, an Active Storage Cluster File System for...",
        
        description: "Patrick Donnelly has published a journal article in Concurrency and Computation: Practice and Experience on the Confuga active cluster file system. The journ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/balancing-push-and-pull-in-confuga-an-active-storage-cluster-file-system-for-sci/";
          
        },
      },{id: "post-interships-at-red-hat-and-cern",
        
          title: "Interships at Red Hat and CERN",
        
        description: "Two CCL graduate students will be off on internships in summer 2016: Haiyan Meng will be interning at Red Hat, working on container technologies. Tim Shaffer…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/interships-at-red-hat-and-cern/";
          
        },
      },{id: "post-ph-d-defense-patrick-donnelly",
        
          title: "Ph.D. Defense: Patrick Donnelly",
        
        description: "Patrick Donnelly successfully defended his Ph.D. titled &quot;Data Locality Techniques in an Active Cluster Filesystem for Scientific Workflows&quot;. Congratulations …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/phd-defense-patrick-donnelly/";
          
        },
      },{id: "post-searching-for-exo-planets-with-makeflow-and-work-queue",
        
          title: "Searching for Exo-Planets with Makeflow and Work Queue",
        
        description: "Students at the University of Arizona made use of Makeflow and Work Queue to build an image processing pipeline on the Chameleon cloud testbed at TACC . The …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/searching-for-exo-planets-with-makeflow-and-work-queue/";
          
        },
      },{id: "post-parrot-talk-at-osg-all-hands-meeting-2016",
        
          title: "Parrot talk at OSG All-hands meeting 2016",
        
        description: "Ben Tovar gave a talk on using parrot to access CVMFS as part of the Open Science Grid (OSG) all-hands meeting in Clemson, SC. Software access with parrot an…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/parrot-talk-at-osg-all-hands-meeting-2016/";
          
        },
      },{id: "post-cctools-5-4-0-released",
        
          title: "CCTools 5.4.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 5.4.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/cctools-540-released/";
          
        },
      },{id: "post-preservation-talk-at-grid-5000",
        
          title: "Preservation Talk at Grid-5000",
        
        description: "Prof. Thain gave a talk titled Preservation and Portability in Distributed Scientific Applications at the Grid-5000 Winter School on distributed computing in…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/preservation-talk-at-grid-5000/";
          
        },
      },{id: "post-summer-reu-in-disc-at-notre-dame",
        
          title: "Summer REU in DISC at Notre Dame",
        
        description: "REU in Data Intensive Scientific Computing (DISC) at the University of Notre Dame DISC combines big data, big science, and big computers at the University of…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2016/summer-reu-in-disc-at-notre-dame/";
          
        },
      },{id: "post-cctools-5-3-0-released",
        
          title: "CCTools 5.3.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 5.3.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cctools-530-released/";
          
        },
      },{id: "post-analyzing-lhc-data-on-10k-cores-with-lobster",
        
          title: "Analyzing LHC Data on 10K Cores with Lobster",
        
        description: "Prof. Thain gave a talk titled Analyzing LHC Data on 10K Cores with Lobster at the Workshop on Data Intensive Computing in the Clouds at Supercomputing 2015.…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/analyzing-lhc-data-on-10k-cores-with-lobster/";
          
        },
      },{id: "post-global-filesystems-paper-in-ieee-cise",
        
          title: "Global Filesystems Paper in IEEE CiSE",
        
        description: "Our latest paper, in collaboration with Jakob Blomer and the CVMFS team at CERN, describes the evolution of global-scale filesystems to serve the needs of th…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/global-filesystems-paper-in-ieee-cise/";
          
        },
      },{id: "post-preservation-talk-at-ipres-2015",
        
          title: "Preservation Talk at iPres 2015",
        
        description: "Prof. Thain gave a talk titled &quot;Preserving Scientific Software Executions: Preserve the Mess or Encourage Cleanliness&quot; at the 2015 Conference on Digital Pres…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/preservation-talk-at-ipres-2015/";
          
        },
      },{id: "post-cms-case-study-paper-at-chep",
        
          title: "CMS Case Study Paper at CHEP",
        
        description: "Our case study work on how to preserve and reproduce a high energy physics (HEP) application with Parrot has been accepted by Journal of Physics: Conference …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cms-case-study-paper-at-chep/";
          
        },
      },{id: "post-openmalaria-preservation-with-umbrella",
        
          title: "OpenMalaria Preservation with Umbrella",
        
        description: "Haiyan worked together with Alexander from CRC , successfully preserved and reproduced a C++ application, openMalaria , using Umbrella . The data dependencie…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/openmalaria-preservation-with-umbrella/";
          
        },
      },{id: "post-dagvz-paper-at-visual-performance-analysis-workshop",
        
          title: "DAGVz Paper at Visual Performance Analysis Workshop",
        
        description: "An Huynh will be presenting a paper on the visualization of task-parallel programs at the Visual Performance Analysis workshop at Supercomputing 2015.  (He i…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/dagvz-paper-at-visual-performance-analysis-workshop/";
          
        },
      },{id: "post-virtual-wind-tunnel-in-ieee-cise",
        
          title: "Virtual Wind Tunnel in IEEE CiSE",
        
        description: "Some of our recent work on a system for collaborative engineering design was recently featured in the September issue of IEEE Computing in Science and Engine…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/virtual-wind-tunnel-in-ieee-cise/";
          
        },
      },{id: "post-three-papers-at-ieee-cluster-in-chicago",
        
          title: "Three Papers at IEEE Cluster in Chicago",
        
        description: "This week, at the IEEE Cluster Computing conference in Chicago, Ben Tovar will present some of our work on automated application monitoring: Gideon Juve, Ben…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/three-papers-at-ieee-cluster-in-chicago/";
          
        },
      },{id: "post-cctools-5-2-0-released",
        
          title: "CCTools 5.2.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 5.2.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cctools-520-released/";
          
        },
      },{id: "post-recent-ccl-grads-take-faculty-positions",
        
          title: "Recent CCL Grads Take Faculty Positions",
        
        description: "Peter Bui is returning to Notre Dame this fall, where he will be a member of the teaching faculty and will be teaching undergraduate core classes like data s…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/recent-ccl-grads-take-faculty-positions/";
          
        },
      },{id: "post-cms-analysis-on-10k-cores-using-lobster",
        
          title: "CMS Analysis on 10K Cores Using Lobster",
        
        description: "We have been working closely with the CMS physics group at Notre Dame for the last year to build Lobster , a data analysis system that runs on O(10K) cores t…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cms-analysis-on-10k-cores-using-lobster/";
          
        },
      },{id: "post-haipeng-cai-defends-ph-d",
        
          title: "Haipeng Cai Defends Ph.D.",
        
        description: "Haipeng Cai successfully defended his dissertation, &quot;Cost-effective Dependence Analyses for Reliable Software Evolution&quot;, which studied methods for efficient…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/haipeng-cai-defends-phd/";
          
        },
      },{id: "post-cctools-5-1-0-released",
        
          title: "CCTools 5.1.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 5.1.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cctools-510-released/";
          
        },
      },{id: "post-cctools-5-0-0-released",
        
          title: "CCTools 5.0.0 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 5.0.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cctools-500-released/";
          
        },
      },{id: "post-preservation-framework-for-computational-reproducibility-at-iccs-2015",
        
          title: "Preservation Framework for Computational Reproducibility at ICCS 2015",
        
        description: "Haiyan Meng presented our work on Preservation Framework for Computational Reproducibility at the International Conference on Computational Science (ICCS) in…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/preservation-framework-for-computational-reproducibility-at-iccs-2015/";
          
        },
      },{id: "post-umbrella-and-containers-at-vtdc-2015",
        
          title: "Umbrella and Containers at VTDC 2015",
        
        description: "Two CCL students presented their latest work at the Virtualization Technologies in Distributed Computing (VTDC) at the Symposium on High Performance Distribu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/umbrella-and-containers-at-vtdc-2015/";
          
        },
      },{id: "post-lobster-talk-at-condor-week-2015",
        
          title: "Lobster Talk at Condor Week 2015",
        
        description: "Ben Tovar gave an overview of Lobster in the talk High-Energy Physics workloads on 10k non-dedicated opportunistic cores with Lobster . The talk was part of …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/lobster-talk-at-condor-week-2015/";
          
        },
      },{id: "post-a-case-study-in-preserving-a-cms-application-with-parrot",
        
          title: "A Case Study in Preserving a CMS Application with Parrot",
        
        description: "Haiyan Meng will present her case study work in preserving a CMS application with Parrot at CHEP 2015 in Japan: Haiyan Meng, Matthias Wolf, Peter Ivie, Anna …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/a-case-study-in-preserving-a-cms-application-with-parrot/";
          
        },
      },{id: "post-parrot-and-lobster-at-chep-2015",
        
          title: "Parrot and Lobster at CHEP 2015",
        
        description: "CCL students gave two poster presentations at the annual Computing in High Energy Physics (CHEP) conference in Japan.  Both represent our close collaboration…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/parrot-and-lobster-at-chep-2015/";
          
        },
      },{id: "post-peter-sempolinski-defends-ph-d",
        
          title: "Peter Sempolinski Defends Ph.D.",
        
        description: "Dr. Peter Sempolinski successfully defended his PhD thesis titled &quot;An Extensible System for Facilitating Collaboration for Structural Engineering Application…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/peter-sempolinski-defends-phd/";
          
        },
      },{id: "post-cms-analysis-on-10k-cores-with-lobster",
        
          title: "CMS Analysis on 10K Cores with Lobster",
        
        description: "The CMS physics group at Notre Dame has created Lobster , a data analysis system that runs on O(10K) cores to process data produced by the CMS experiment at …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/cms-analysis-on-10k-cores-with-lobster/";
          
        },
      },{id: "post-dinesh-rajan-defends-ph-d",
        
          title: "Dinesh Rajan Defends Ph.D.",
        
        description: "Dr. Dinesh Rajan successfully defended his PhD thesis titled &quot;Principles for the Design and Operating of Elastic Scientific Applications on Distributed Syste…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/dinesh-rajan-defends-phd/";
          
        },
      },{id: "post-confuga-scalable-data-intensive-computing-for-posix-workflows",
        
          title: "Confuga: Scalable Data Intensive Computing for POSIX Workflows",
        
        description: "Patrick Donnely will present his work on the Confuga distributed filesystem at CCGrid 2015 in China: Patrick Donnelly, Nicholas Hazekamp, Douglas Thain, Conf…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/confuga-scalable-data-intensive-computing-for-posix-workflows/";
          
        },
      },{id: "post-makeflow-visualization-with-cytoscape",
        
          title: "Makeflow Visualization with Cytoscape",
        
        description: "We have created a new Makeflow visualization module which exports a workflow into an xgmml file compatible with Cytoscape.  Cytoscape is a powerful network g…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/makeflow-visualization-with-cytoscape/";
          
        },
      },{id: "post-creating-better-force-fields-on-distributed-gpus-with-work-queue",
        
          title: "Creating Better Force Fields on Distributed GPUs with Work Queue",
        
        description: "ForceBalance is an open source software tool for creating accurate force fields for molecular mechanics simulation using flexible combinations of reference…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/creating-better-force-fields-on-distributed-gpus-with-work-queue/";
          
        },
      },{id: "post-cctools-4-3-released",
        
          title: "CCTools 4.3 released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 4.3.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/cctools-43-released/";
          
        },
      },{id: "post-work-queue-powers-nanoreactor-simulations",
        
          title: "Work Queue Powers Nanoreactor Simulations",
        
        description: "Lee-Ping Wang at Stanford University, recently published a paper in Nature Chemistry describing his work in fundamental molecular dynamics. The paper demonst…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/work-queue-powers-nanoreactor-simulations/";
          
        },
      },{id: "post-open-sourcing-civil-engineering-with-a-virtual-wind-tunnel",
        
          title: "Open Sourcing Civil Engineering with a Virtual Wind Tunnel",
        
        description: "In addition to the CCL tools themselves, members of the CCL lab often collaborate with other research groups to help them solve their scientific problems, us…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/open-sourcing-civil-engineering-with-a-virtual-wind-tunnel/";
          
        },
      },{id: "post-deltadb-a-scalable-database-design-for-time-varying-schema-free-data",
        
          title: "DeltaDB - A Scalable Database Design for Time-Varying Schema-Free Data",
        
        description: "DeltaDB is a log-structure database and query model designed for time-varying and schema-free data. The following video gives a high level overview of DeltaD…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/deltadb-a-scalable-database-design-for-time-varying-schema-free-data/";
          
        },
      },{id: "post-recent-improvements-in-parrot",
        
          title: "Recent Improvements in Parrot",
        
        description: "There have been several exciting modifications to Parrot in the last two months which should help stabilize Parrot in many aspects. But first, what is Parrot…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/recent-improvements-in-parrot/";
          
        },
      },{id: "post-packaging-applications-with-parrot-4-2-0",
        
          title: "Packaging Applications with Parrot 4.2.0",
        
        description: "CCTools 4.2.0 includes a new feature in Parrot that allows you to automatically observe all of the files used by a given application, and then collect them u…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/packaging-applications-with-parrot-420/";
          
        },
      },{id: "post-cctools-4-2-0-released",
        
          title: "CCTools 4.2.0 released",
        
        description: "We are pleased to announce the release of version 4.2.0 of the Cooperative Computing Tools including Parrot, Chirp, Makeflow, WorkQueue, SAND, All-Pairs, and…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/cctools-420-released/";
          
        },
      },{id: "post-deltadb-at-ieee-bigdata-2014",
        
          title: "DeltaDB at IEEE BigData 2014",
        
        description: "Peter Ivie will be presenting his work on the DeltaDB database model for time-varying schema-free data at the IEEE International Congress on Big Data in Anch…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/deltadb-at-ieee-bigdata-2014/";
          
        },
      },{id: "post-journal-paper-on-maker-and-work-queue",
        
          title: "Journal Paper on MAKER and Work Queue",
        
        description: "Our paper on converting the MAKER bioinformatics analysis from MPI to Work Queue, done in collaboration with the Notre Dame Bioinformatics Laboratory was rec…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/journal-paper-on-maker-and-work-queue/";
          
        },
      },{id: "post-ccl-papers-at-ccgrid-2014",
        
          title: "CCL Papers at CCGrid 2014",
        
        description: "Three papers from the CCL were presented at the 2014 IEEE Conference on Cluster, Cloud, and Grid Computing in Chicago: Paul Brenner presented a regular paper…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/ccl-papers-at-ccgrid-2014/";
          
        },
      },{id: "post-toward-a-common-model-of-highly-concurrent-programming",
        
          title: "Toward a Common Model of Highly Concurrent Programming",
        
        description: "(This is the short version of a talk I gave at the MTAGS workshop at Supercomputing 2013. See the slides here .) Historically, highly concurrent programming …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/toward-a-common-model-of-highly-concurrent-programming/";
          
        },
      },{id: "post-visualizing-10-000-cores-in-condor",
        
          title: "Visualizing 10,000 Cores in Condor",
        
        description: "Our Condor pool at the University of Notre Dame has been slowly growing, in no small part due to our collaboration with the Center for Research Computing, wh…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2014/visualizing-10000-cores-in-condor/";
          
        },
      },{id: "post-ccl-papers-at-supercomputing-2013",
        
          title: "CCL Papers at Supercomputing 2013",
        
        description: "Members of the CCL team presented several papers at Supercomputing 2013 in Denver, Colorado: Casey Robinson presented Automated Packaging of Bioinformatics W…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/ccl-papers-at-supercomputing-2013/";
          
        },
      },{id: "post-ccl-workshop-2013",
        
          title: "CCL Workshop 2013",
        
        description: "The Annual CCL Workshop was held on October 10-11 at the University of Notre Dame.  The CCL team ran beginning and advanced tutorials and gave highlights of…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/ccl-workshop-2013/";
          
        },
      },{id: "post-ccl-workshop-october-10-11-at-notre-dame",
        
          title: "CCL Workshop October 10-11 at Notre Dame",
        
        description: "Join us for the annual CCL workshop at the University of Notre Dame! http://www.nd.edu/~ccl/workshop/2013 The workshop is an opportunity for beginners and ex…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/ccl-workshop-october-10-11-at-notre-dame/";
          
        },
      },{id: "post-new-work-queue-paper-at-ieee-cluster-2013",
        
          title: "New Work Queue Paper at IEEE Cluster 2013",
        
        description: "Michael Albrecht and Dinesh Rajan will present their latest work titled Making Work Queue Cluster Friendly for Data Intensive Scientific Applications . In th…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/new-work-queue-paper-at-ieee-cluster-2013/";
          
        },
      },{id: "post-cctools-4-0-released",
        
          title: "CCTools 4.0 Released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 4.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, WorkQu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/cctools-40-released/";
          
        },
      },{id: "post-ph-d-defense-li-yu",
        
          title: "Ph.D. Defense: Li Yu",
        
        description: "Congratulations to Dr. Li Yu, who successfully defended his Ph.D. dissertation, Right-sizing Resource Allocations for Scientific Applications in Clusters, Gr…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/phd-defense-li-yu/";
          
        },
      },{id: "post-tutorial-on-building-scalable-scientific-applications-at-xsede13",
        
          title: "Tutorial on Building Scalable Scientific Applications at XSEDE13",
        
        description: "We will be offering a tutorial titled Building Scalable Scientific Applications using Makeflow and Work Queue as part of XSEDE 2013 in San Diego on July 22.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/tutorial-on-building-scalable-scientific-applications-at-xsede13/";
          
        },
      },{id: "post-a-globally-scalable-filesystem-from-grow-to-cvmfs",
        
          title: "A Globally Scalable Filesystem: From GROW to CVMFS",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/a-globally-scalable-filesystem-from-grow-to-cvmfs/";
          
        },
      },{id: "post-multi-slot-work-queue",
        
          title: "Multi-Slot Work Queue",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/multi-slot-work-queue/";
          
        },
      },{id: "post-hierarchical-work-queue",
        
          title: "Hierarchical Work Queue",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/hierarchical-work-queue/";
          
        },
      },{id: "post-accelerating-protein-folding-with-adaptive-weighted-ensemble-and-work-queue",
        
          title: "Accelerating Protein Folding with Adaptive Weighted Ensemble and Work Queue",
        
        description: "Computational protein folding has historically relied on long-running simulations of single molecules. Although many such simulations can run be at once, t…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/accelerating-protein-folding-with-adaptive-weighted-ensemble-and-work-queue/";
          
        },
      },{id: "post-dinesh-rajan-wins-best-talk-at-ccgrid-2013",
        
          title: "Dinesh Rajan Wins Best Talk at CCGrid 2013",
        
        description: "Congratulations to CCL graduate student Dinesh Rajan, who won the Best Presentation Award at CCGrid 2013 for his presentation of Case Studies in Designing El…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/dinesh-rajan-wins-best-talk-at-ccgrid-2013/";
          
        },
      },{id: "post-tutorial-on-makeflow-and-work-queue-at-ccgrid-2013",
        
          title: "Tutorial on Makeflow and Work Queue at CCGrid 2013",
        
        description: "Dinesh Rajan will present a tutorial on Building Elastic Applications with Makeflow and Work Queue as part of CCGrid 2013 in Delft, the Netherlands on May 13…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/tutorial-on-makeflow-and-work-queue-at-ccgrid-2013/";
          
        },
      },{id: "post-elastic-apps-paper-at-ccgrid-2013",
        
          title: "Elastic Apps Paper at CCGrid 2013",
        
        description: "Dinesh Rajan will present his paper Case Studies in Designing Elastic Applications at the IEEE International Conference on Clusters, Clouds, and Grids (CCGri…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/elastic-apps-paper-at-ccgrid-2013/";
          
        },
      },{id: "post-genome-assembly-paper-in-ieee-tpds",
        
          title: "Genome Assembly Paper in IEEE TPDS",
        
        description: "A recent article in IEEE Transactions on Parallel and Distributed Computing describes our work in collaboration with the Notre Dame Bioinformatics Laboratory…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/genome-assembly-paper-in-ieee-tpds/";
          
        },
      },{id: "post-cctools-3-7-0-released",
        
          title: "CCTools 3.7.0 Released!",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.7.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/cctools-370-released/";
          
        },
      },{id: "post-cctools-3-6-2-released",
        
          title: "CCTools 3.6.2 Released!",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.6.2 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/cctools-362-released/";
          
        },
      },{id: "post-teaching-distributed-computing-with-work-queue",
        
          title: "Teaching Distributed Computing with Work Queue",
        
        description: "The undergraduate Programming Paradigms class at the University of Notre Dame introduces undergraduate students to a variety of parallel and distributed prog…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/teaching-distributed-computing-with-work-queue/";
          
        },
      },{id: "post-scaling-up-comparative-genomics-with-makeflow",
        
          title: "Scaling Up Comparative Genomics with Makeflow",
        
        description: "The CoGe Comparative Genomics Portal provides on-the-fly genomic analysis and comparative tools for nearly 20,000 genomes from 15,000 organisms and has beco…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2013/scaling-up-comparative-genomics-with-makeflow/";
          
        },
      },{id: "post-cctools-3-6-1-released",
        
          title: "CCTools 3.6.1 Released!",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.6.1 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-361-released/";
          
        },
      },{id: "post-applied-cyber-infrastructure-class-at-u-arizona",
        
          title: "Applied Cyber Infrastructure Class at U. Arizona",
        
        description: "The Applied Cyber Infrastructure Concepts course at the University of Arizona makes use of the Cooperative Computing Tools to teach principles of large scale…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/applied-cyber-infrastructure-class-at-u-arizona/";
          
        },
      },{id: "post-nsf-grant-data-and-software-preservation-for-open-science",
        
          title: "NSF Grant: Data and Software Preservation for Open Science",
        
        description: "Mike Hildreth, Professor of Physics, Jarek Nabrzyski, Director of the Center for Research Computing and Concurrent Associate Professor of Computer Science an…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/nsf-grant-data-and-software-preservation-for-open-science/";
          
        },
      },{id: "post-tutorial-on-scalable-programming-at-notre-dame",
        
          title: "Tutorial on Scalable Programming at Notre Dame",
        
        description: "Tutorial: Introduction to Scalable Programming with Makeflow and Work Queue October 24th, 3-5PM, 303 Cushing Hall Register here (no fee) to reserve your spot…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/tutorial-on-scalable-programming-at-notre-dame/";
          
        },
      },{id: "post-global-access-to-high-energy-physics-software-with-parrot-and-cvmfs",
        
          title: "Global Access to High Energy Physics Software with Parrot and CVMFS",
        
        description: "Scientists searching for the Higgs boson have profited from Parrot&#39;s new support for the CernVM Filesystem (CVMFS) , a network filesystem tailored to providi…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/global-access-to-high-energy-physics-software-with-parrot-and-cvmfs/";
          
        },
      },{id: "post-cctools-3-6-0-released",
        
          title: "CCTools 3.6.0 Released!",
        
        description: "The Cooperative Computing Lab is pleased to announce the release ofversion 3.6.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, WorkQ…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-360-released/";
          
        },
      },{id: "post-papers-at-e-science-conference",
        
          title: "Papers at e-Science Conference",
        
        description: "Members of the CCL will present two papers and two posters at the upcoming IEEE Conference on e-Science in Chicago: Badi Abdul-Wahid, Li Yu, Dinesh Rajan, Ha…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/papers-at-e-science-conference/";
          
        },
      },{id: "post-lecture-and-tutorial-univ-of-arizona",
        
          title: "Lecture and Tutorial: Univ. of Arizona",
        
        description: "We are doing a guest lecture and tutorial titled Building Scalable Data Intensive Applications with Makeflow and Work Queue at the University of Arizona as p…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/lecture-and-tutorial-univ-of-arizona/";
          
        },
      },{id: "post-rapid-processing-of-lidar-data-in-the-field-with-makeflow",
        
          title: "Rapid Processing of LIDAR Data in the Field with Makeflow",
        
        description: "Makeflow is used to manage the data processing workflow of the Airborne Lidar Processing System (ALPS) for the Experimental Advanced Airborne Research Lidar …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/rapid-processing-of-lidar-data-in-the-field-with-makeflow/";
          
        },
      },{id: "post-tutorial-at-cloud-summer-school",
        
          title: "Tutorial at Cloud Summer School",
        
        description: "We will be offering a tutorial titled Building Scalable Data Intensive Applications on the Cloud with Makeflow and Work Queue as part of the Science Cloud Su…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/tutorial-at-cloud-summer-school/";
          
        },
      },{id: "post-talk-at-ice-workshop",
        
          title: "Talk at ICE Workshop",
        
        description: "Prof. Thain gave a talk titled Computational Abstractions: Strategies for Scaling Up Applications at the Initiative for Computational Economics at the Univer…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/talk-at-ice-workshop/";
          
        },
      },{id: "post-cctools-3-5-2-released",
        
          title: "CCTools 3.5.2 Released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.5.2 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-352-released/";
          
        },
      },{id: "post-cctools-3-5-1-released",
        
          title: "CCTools 3.5.1 Released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.5.1 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-351-released/";
          
        },
      },{id: "post-cctools-3-5-0-released",
        
          title: "CCTools 3.5.0 Released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.5.0 of the Cooperative Computing Tools,  including Parrot, Chirp, Makeflow, Wor…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-350-released/";
          
        },
      },{id: "post-ph-d-defense-peter-bui",
        
          title: "Ph.D. Defense: Peter Bui",
        
        description: "Congratulations to Dr. Peter Bui, who successfully defended his dissertation titled &quot;A Compiler Toolchain for Distributed Data Intensive Scientific Workflows&quot; !",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/phd-defense-peter-bui/";
          
        },
      },{id: "post-ph-d-defense-hoang-bui",
        
          title: "Ph.D. Defense: Hoang Bui",
        
        description: "Congratulations to Dr. Hoang Bui, who successfully defended his dissertation titled A Rich Metadata Filesystem for Scientific Data !",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/phd-defense-hoang-bui/";
          
        },
      },{id: "post-makeflow-paper-at-sweet",
        
          title: "Makeflow Paper at SWEET",
        
        description: "Michael Albrecht will present our paper Makeflow: A Portable Abstraction for Data Intensive Computing on Clusters, Clouds, and Grids at the workshop on Scala…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/makeflow-paper-at-sweet/";
          
        },
      },{id: "post-chirp-paper-at-ccgrid",
        
          title: "Chirp Paper at CCGrid",
        
        description: "Patrick Donnelly is presenting his most recent paper, Fine-Grained Access Control in the Chirp Distributed File System at the IEEE/ACM International Symposiu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/chirp-paper-at-ccgrid/";
          
        },
      },{id: "post-cctools-3-4-3-released",
        
          title: "CCTools 3.4.3 Released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.4.3 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-343-released/";
          
        },
      },{id: "post-ccl-workshop-june-11-12",
        
          title: "CCL Workshop June 11-12",
        
        description: "The first annual CCL workshop will be held June 11-12th, 2012 on the campus of the University of Notre Dame. The theme of this year&#39;s workshop is &quot;Scalable S…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/ccl-workshop-june-11-12/";
          
        },
      },{id: "post-cctools-3-4-2-released",
        
          title: "CCTools 3.4.2 Released",
        
        description: "The Cooperative Computing Lab is pleased to announce the release of version 3.4.2 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/cctools-342-released/";
          
        },
      },{id: "post-some-open-computer-science-problems-in-workflow-systems",
        
          title: "Some Open Computer Science Problems in Workflow Systems",
        
        description: "In the previous article , I extolled the virtues of Makeflow , which has  been very effective at engaging new users and allowing them to express their workfl…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/some-open-computer-science-problems-in-workflow-systems/";
          
        },
      },{id: "post-why-makeflow-works-for-new-users",
        
          title: "Why Makeflow Works for New Users",
        
        description: "In past articles , I have introduced Makeflow , which is a large scale workflow engine that we have created at Notre Dame. Of course, Makeflow is certainly n…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/why-makeflow-works-for-new-users/";
          
        },
      },{id: "post-talk-cs-problems-in-distributed-computing",
        
          title: "Talk: CS Problems in Distributed Computing",
        
        description: "Prof. Thain gave a talk titled Unsolved Computer Science Problems in Distributed Computing at Grid Computing: The Next Decade in Zakopane, Poland.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2012/talk-cs-problems-in-distributed-computing/";
          
        },
      },{id: "post-cctools-3-4-1-released",
        
          title: "CCTools 3.4.1 Released",
        
        description: "We are pleased to announce the release of version 3.4.1 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/cctools-341-released/";
          
        },
      },{id: "post-scientific-workflow-management-course",
        
          title: "Scientific Workflow Management Course",
        
        description: "Michael Albrecht will be teaching CSE 60145: Scientific Workflow Management in the spring of 2012. The goal of this course is to cover the tools and techniqu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/scientific-workflow-management-course/";
          
        },
      },{id: "post-paper-at-pyhpc-workshop",
        
          title: "Paper at PyHPC Workshop",
        
        description: "Peter Bui will be presenting Work Queue + Python: A Framework For Scalable Scientific Ensemble Applications at the Workshop on Python for High Performance an…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/paper-at-pyhpc-workshop/";
          
        },
      },{id: "post-talk-at-uab",
        
          title: "Talk at UAB",
        
        description: "Prof. Thain gave a talk titled High Throughput Scientific Computing with Condor: Computer Science Challenges in Large Scale Parallelism at the University of …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/talk-at-uab/";
          
        },
      },{id: "post-cctools-3-4-0-released",
        
          title: "CCTools 3.4.0 Released",
        
        description: "We are pleased to announce the release of version 3.4.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/cctools-340-released/";
          
        },
      },{id: "post-paper-at-cloudcom-2011",
        
          title: "Paper at CloudCom 2011",
        
        description: "Dinesh Pandiar wrote a paper titled Converting A High Performance Application to an Elastic Cloud Application , which was accepted to the IEEE CloudCom confe…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/paper-at-cloudcom-2011/";
          
        },
      },{id: "post-cctools-3-3-4-released",
        
          title: "CCTools 3.3.4 Released",
        
        description: "We are pleased to announce the release of version 3.3.4 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/cctools-334-released/";
          
        },
      },{id: "post-analysis-of-atlas-high-energy-physics-data-with-chirp",
        
          title: "Analysis of ATLAS High Energy Physics Data with Chirp",
        
        description: "The Chirp filesystem has been in production use by the ATLAS experiment at the Large Hadron Collider facility in Geneva.  The Chirp file server provides stag…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/analysis-of-atlas-high-energy-physics-data-with-chirp/";
          
        },
      },{id: "post-cctools-3-3-3-released",
        
          title: "CCTools 3.3.3 Released",
        
        description: "We are pleased to announce the release of version 3.3.3 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/cctools-333-released/";
          
        },
      },{id: "post-posters-at-cca-11",
        
          title: "Posters at CCA-11",
        
        description: "Three graduate students from the CCL -- Dinesh Rajan, Peter Sempolinksi, and Li Yu - presented their ongoing work at the Cloud Computing and Applications wor…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/posters-at-cca-11/";
          
        },
      },{id: "post-cctools-3-3-0-released",
        
          title: "CCTools 3.3.0 Released",
        
        description: "We are pleased to announce the release of version 3.3.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/cctools-330-released/";
          
        },
      },{id: "post-talk-at-idga-cloud-computing",
        
          title: "Talk at IDGA Cloud Computing",
        
        description: "Prof. Thain gave a talk titled Models and Frameworks for Data Intensive Cloud Computing at the IDGA Cloud Computing Summit in Washington DC.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/talk-at-idga-cloud-computing/";
          
        },
      },{id: "post-scalable-assembler-released",
        
          title: "Scalable Assembler Released",
        
        description: "We are pleased to announce the release of version 3.2.0 of SAND -- the Scalable Assembler at Notre Dame. SAND replaces the early stages of the Celera Assembl…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2011/scalable-assembler-released/";
          
        },
      },{id: "post-the-virtualization-theorem-ignored-for-three-decades",
        
          title: "The Virtualization Theorem Ignored for Three Decades",
        
        description: "Today, in my graduate operating systems class, we discussed what I believe is the most important result in computer science ever to be persistently ignored :…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/the-virtualization-theorem-ignored-for-three-decades/";
          
        },
      },{id: "post-cctools-3-1-2-released",
        
          title: "CCTools 3.1.2 Released",
        
        description: "We are pleased to announce the release of version 3.1.2 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/cctools-312-released/";
          
        },
      },{id: "post-sometimes-it-all-comes-together",
        
          title: "Sometimes It All Comes Together",
        
        description: "Most days, software engineering involves compromises and imperfect solutions. It&#39;s rare for two pieces of software to mesh perfectly -- you always have to wo…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/sometimes-it-all-comes-together/";
          
        },
      },{id: "post-paper-at-works-workshop",
        
          title: "Paper at WORKS Workshop",
        
        description: "Andrew Thrasher will present Taming Complex Bioinformatics Workflows with Weaver, Makeflow, and Starch at the Fifth Workshop on Workflows in Support of Large…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/paper-at-works-workshop/";
          
        },
      },{id: "post-compiling-workflows-with-weaver",
        
          title: "Compiling Workflows with Weaver",
        
        description: "Over the last year, our Makeflow system has become quite popular here at Notre Dame.  Briefly, Makeflow takes a workload expressed in the plain old Make form…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/compiling-workflows-with-weaver/";
          
        },
      },{id: "post-from-database-to-filesystem-and-back-again",
        
          title: "From Database to Filesystem and Back Again",
        
        description: "Hoang Bui is leading the development of ROARS: a Rich Object Archival System, which is our generalization many of the ideas expressed in the Biometrics Resea…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/from-database-to-filesystem-and-back-again/";
          
        },
      },{id: "post-papers-at-cloudcom",
        
          title: "Papers at CloudCom",
        
        description: "Two graduate students from the CCL will be presenting their work at the IEEE CloudCom conference in Indianapolis. Peter Sempolinski will present A Comparison…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/papers-at-cloudcom/";
          
        },
      },{id: "post-papers-at-hpdc-workshops",
        
          title: "Papers at HPDC Workshops",
        
        description: "Three graduate students from the CCL presented papers at workshops co-located with High Performance Distributed Computing this summer in Chicago: Rory Carmic…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/papers-at-hpdc-workshops/";
          
        },
      },{id: "post-summer-reu-toward-elastic-scientific-applications",
        
          title: "Summer REU: Toward Elastic Scientific Applications",
        
        description: "In recent months, we have been working on the problem of building elastic parallel applications that can adapt to the available resources at run-time. Much h…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/summer-reu-toward-elastic-scientific-applications/";
          
        },
      },{id: "post-cctools-3-1-1-released",
        
          title: "CCTools 3.1.1 Released",
        
        description: "We are pleased to announce the release of version 3.1.1 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, All-Pairs, a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/cctools-311-released/";
          
        },
      },{id: "post-nsf-grant-on-cloud-computing",
        
          title: "NSF Grant on Cloud Computing",
        
        description: "We have received a &quot;Computing in the Cloud&quot; grant from the National Science Foundation to study the possibilities of running large scale applications on the …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/nsf-grant-on-cloud-computing/";
          
        },
      },{id: "post-cctools-3-1-0-released",
        
          title: "CCTools 3.1.0 Released",
        
        description: "We are pleased to announce the release of version 3.1.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, and other so…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/cctools-310-released/";
          
        },
      },{id: "post-tutorial-on-makeflow-and-work-queue",
        
          title: "Tutorial on Makeflow and Work Queue",
        
        description: "Presented by Li Yu and Peter Bui Tuesday, June 29th, 2010, 1-3PM, room 177 Fitzpatrick Hall Makeflow and Work Queue are frameworks that make it easy to const…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/tutorial-on-makeflow-and-work-queue/";
          
        },
      },{id: "post-posters-at-ci-days-workshop",
        
          title: "Posters at CI-Days Workshop",
        
        description: "The Center for Research Computing at Notre Dame recently hosted an NSF sponsored &quot;Cyberinfrastructure Days&quot; workshop.  Students from the CCL presented a vari…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/posters-at-ci-days-workshop/";
          
        },
      },{id: "post-ph-d-defense-christopher-moretti",
        
          title: "Ph.D. Defense: Christopher Moretti",
        
        description: "Congratulations to Dr. Christopher Moretti, who successfully defended his dissertation titled Abstractions for Scientific Computing on Campus Grids !",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/phd-defense-christopher-moretti/";
          
        },
      },{id: "post-talks-at-condor-week",
        
          title: "Talks at Condor Week",
        
        description: "Graduate students Li Yu and Peter Bui each gave talks at Condor Week in Madison, WI: Scaling Up Scientific Workflows with Makeflow , and Weaving Abstractions…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/talks-at-condor-week/";
          
        },
      },{id: "post-the-forty-tribes-of-linux",
        
          title: "The Forty Tribes of Linux",
        
        description: "As I have noted in this column before, a perennial challenge of distributed computing in the real world is dealing with the multiplicity of operating systems…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/the-forty-tribes-of-linux/";
          
        },
      },{id: "post-cctools-3-0-0-released",
        
          title: "CCTools 3.0.0 Released",
        
        description: "We are pleased to announce the release of version 3.0.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, SAND, and other so…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/cctools-300-released/";
          
        },
      },{id: "post-condor-log-analyzer-updated",
        
          title: "Condor Log Analyzer Updated",
        
        description: "The Condor Log Analyzer is a web service that provides feedback on large Condor workloads.  It has recently been updated to support a wider variety of log fi…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/condor-log-analyzer-updated/";
          
        },
      },{id: "post-summer-reu-at-notre-dame",
        
          title: "Summer REU at Notre Dame",
        
        description: "We invite outstanding undergraduates to apply for summer research positions in scientific and cloud computing at the University of Notre Dame. Students will …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/summer-reu-at-notre-dame/";
          
        },
      },{id: "post-job-openings-updated",
        
          title: "Job Openings Updated",
        
        description: "See the jobs page for new openings for undergraduate researchers as well as postdocs and professionals.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/job-openings-updated/";
          
        },
      },{id: "post-green-cloud-online",
        
          title: "Green Cloud Online",
        
        description: "The Green Cloud is now online! The Green Cloud is the invention of Dr. Paul Brenner at the ND Center for Research Computing.  It is a containerized data cent…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2010/green-cloud-online/";
          
        },
      },{id: "post-cctools-2-6-0-released",
        
          title: "CCTools 2.6.0 Released",
        
        description: "We are pleased to announce the release of version 2.6.0 of the Cooperative Computing Tools, including Parrot, Chirp, Makeflow, Work Queue, and other software…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/cctools-260-released/";
          
        },
      },{id: "post-two-teaching-fellowships",
        
          title: "Two Teaching Fellowships",
        
        description: "Two graduate students in the CCL have received competitive teaching fellowships for the coming year: Chris Moretti will be one of three fellows teaching Intr…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/two-teaching-fellowships/";
          
        },
      },{id: "post-genome-assembly-at-mtags-2009",
        
          title: "Genome Assembly at MTAGS 2009",
        
        description: "Christopher Moretti and Michael Olson will present their most recent work on Scalable Genome Assembly at the MTAGS Workshop held at Supercomputing 2009 . The…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/genome-assembly-at-mtags-2009/";
          
        },
      },{id: "post-cctools-2-5-5-released",
        
          title: "CCTools 2.5.5 Released",
        
        description: "We are pleased to announce release 2.5.5 of the Cooperative Computing Tools, including Parrot, Chirp, Work Queue, Makeflow, and other tools which may be down…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/cctools-255-released/";
          
        },
      },{id: "post-energy-management-at-ieee-grid",
        
          title: "Energy Management at IEEE Grid",
        
        description: "Recent graduate Michael Lammie presented his work on managing energy in multicore clusters at the IEEE Grid conference in Banff, Canada.  His paper titled Sc…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/energy-management-at-ieee-grid/";
          
        },
      },{id: "post-on-programming-with-processes-part-ii",
        
          title: "On Programming With Processes, Part II",
        
        description: "One of the biggest challenges in building computer systems is finding a way to make things simpler . Any propeller-head can make a piece of software more com…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/on-programming-with-processes-part-ii/";
          
        },
      },{id: "post-partly-cloudy-with-a-chance-of-condor",
        
          title: "Partly Cloudy with a Chance of Condor",
        
        description: "We have been thinking about cloud computing quite a bit over the last month. As I noted earlier , cloud computing is hardly a new idea, but it does add a few…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/partly-cloudy-with-a-chance-of-condor/";
          
        },
      },{id: "post-ph-d-defense-kyle-wheeler",
        
          title: "Ph.D. Defense: Kyle Wheeler",
        
        description: "Congratulations to Dr. Kyle Wheeler, who successfully defended his dissertation titled Exploiting Shared Memory Topology with QThreads for Portable Parallel …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/phd-defense-kyle-wheeler/";
          
        },
      },{id: "post-talk-at-clemson-university",
        
          title: "Talk at Clemson University",
        
        description: "Prof. Thain gave a guest lecture at Clemson University titled Scaling up Data Intensive Science to Campus Grids .",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/talk-at-clemson-university/";
          
        },
      },{id: "post-talk-at-geoclouds-workshop",
        
          title: "Talk at GeoClouds Workshop",
        
        description: "Prof. Thain gave the opening talk, Science in the Clouds: History, Challenges, and Opportunities , at the GeoClouds Workshop in Indianapolis.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/talk-at-geoclouds-workshop/";
          
        },
      },{id: "post-nsf-grant-to-support-open-source-engineering",
        
          title: "NSF Grant to Support Open Source Engineering",
        
        description: "A team of researchers at the University of Notre Dame has received a $1.4M grant from the National Science Foundation titled Open Sourcing the Design of Civi…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/nsf-grant-to-support-open-source-engineering/";
          
        },
      },{id: "post-nsf-grant-to-build-collaborative-storage",
        
          title: "NSF Grant to Build Collaborative Storage",
        
        description: "We have received a Collaborative Research Infrastructure grant from the National Science Foundation to build a wide area testbed for data intensive computing…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/nsf-grant-to-build-collaborative-storage/";
          
        },
      },{id: "post-talk-at-hec-fsio",
        
          title: "Talk at HEC-FSIO",
        
        description: "Prof. Thain gave a talk titled &quot;Getting Beyond the Filesystem&quot; at the NSF/DOE High End Computing File Systems and I/O Workshop in Washington, DC.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/talk-at-hec-fsio/";
          
        },
      },{id: "post-reu-project-bxgrid",
        
          title: "REU Project: BXGrid",
        
        description: "This post continues last week&#39;s subject of summer REU projects. Rachel Witty and Kameron Srimoungchanh worked on BXGrid , our web portal and computing system…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/reu-project-bxgrid/";
          
        },
      },{id: "post-ph-d-defense-jeffrey-hemmes",
        
          title: "Ph.D. Defense: Jeffrey Hemmes",
        
        description: "Congratulations to Dr. Jeffrey Hemmes, who successfully defended his dissertation titled Improving Data Availability in Mobile Applications Through Enhanced …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/phd-defense-jeffrey-hemmes/";
          
        },
      },{id: "post-reu-project-biocompute",
        
          title: "REU Project: Biocompute",
        
        description: "This summer, we hosted four REU students who contributed to two web portals for distributed computing: Biocompute and BXGrid. I&#39;ll write about one this week …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/reu-project-biocompute/";
          
        },
      },{id: "post-maj-hemmes-returns-home",
        
          title: "MAJ Hemmes Returns Home",
        
        description: "Major Jeffrey Hemmes , USAF, recently returned to the United States from duty in Iraq.  He is currently a PhD candidate in the CCL, and will assume teaching …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/maj-hemmes-returns-home/";
          
        },
      },{id: "post-make-as-an-abstraction-for-distributed-computing",
        
          title: "Make as an Abstraction for Distributed Computing",
        
        description: "In previous articles, I have introduced the idea of abstractions for distributed computing. An abstraction is a way of specifying a large amount of work in a…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/make-as-an-abstraction-for-distributed-computing/";
          
        },
      },{id: "post-cctools-2-5-3-released",
        
          title: "CCTools 2.5.3 Released",
        
        description: "We are pleased to announce release 2.5.3 of the Cooperative Computing Tools, including Parrot, Chirp, and other tools which may be downloaded here: http://ww…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/cctools-253-released/";
          
        },
      },{id: "post-cctools-2-5-2-released",
        
          title: "CCTools 2.5.2 Released",
        
        description: "We are pleased to announce release 2.5.2 of the Cooperative Computing Tools, including Parrot, Chirp, and other tools which may be downloaded here: http://ww…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/cctools-252-released/";
          
        },
      },{id: "post-talks-at-hpdc-2009",
        
          title: "Talks at HPDC 2009",
        
        description: "Li Yu presented our work on Harnessing Parallelism in Multicore Clusters with the All-Pairs and Wavefront Abstractions at HPDC 2009 in Munich.  Prof. Thain g…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/talks-at-hpdc-2009/";
          
        },
      },{id: "post-grid-heating-wins-green-it-award",
        
          title: "Grid Heating Wins Green IT Award",
        
        description: "Paul Brenner&#39;s paper, Grid Heating Clusters: Transforming Cooling Constraints into Thermal Benefits won a &quot;Green IT Award&quot; from the Uptime Institute.  Read m…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/grid-heating-wins-green-it-award/";
          
        },
      },{id: "post-cctools-2-5-0-released",
        
          title: "CCTools 2.5.0 Released",
        
        description: "We are pleased to announce release 2.5.0 of the Cooperative Computing Tools, including Parrot, Chirp, and other tools which may be downloaded here: http://ww…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/cctools-250-released/";
          
        },
      },{id: "post-grid-heating-putting-data-center-heat-to-productive-use",
        
          title: "Grid Heating: Putting Data Center Heat to Productive Use",
        
        description: "Dr. Paul Brenner, a research scientist in the Computing Research Center at the University Notre Dame, has been advocating a novel idea called grid heating . …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/grid-heating-putting-data-center-heat-to-productive-use/";
          
        },
      },{id: "post-bxgrid-article-in-jcc",
        
          title: "BXGrid Article in JCC",
        
        description: "Our article on the Biometrics Research Grid, Experience with BXGrid: A Data Repository and Computing Grid for Biometrics Research has been accepted to the Jo…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/bxgrid-article-in-jcc/";
          
        },
      },{id: "post-dynamic-linking-and-distributed-computing-don-amp-39-t-mix",
        
          title: "Dynamic Linking and Distributed Computing Don&amp;#39;t Mix",
        
        description: "Dynamic linking is one of the more frustrating aspects of distributed computing in the real world. It&#39;s is the sort of technology that is meant to optimize t…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/dynamic-linking-and-distributed-computing-don39t-mix/";
          
        },
      },{id: "post-parrot-flies-on-the-lhc-computing-grid",
        
          title: "Parrot Flies on the LHC Computing Grid",
        
        description: "In a paper presented at CHEP 2009 , a group of physicists describes how Parrot is used to distribute a large software package hosted at Fermilab in the Unite…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/parrot-flies-on-the-lhc-computing-grid/";
          
        },
      },{id: "post-honors-defense-patrick-braga-henebry",
        
          title: "Honors Defense: Patrick Braga-Henebry",
        
        description: "Patrick Braga-Henebry successfully defended his B.S. honors thesis title &quot;Biocompute: Providing a Distributed Computing Model for Searching Genome Datasets.&quot;…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/honors-defense-patrick-braga-henebry/";
          
        },
      },{id: "post-presentations-at-condor-week-2009",
        
          title: "Presentations at Condor Week 2009",
        
        description: "Chris Moretti and Hoang Bui gave presentations at Condor Week in Madison.  Chris presented Abstractions for Data Intensive Computing on Condor and Hoang pres…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/presentations-at-condor-week-2009/";
          
        },
      },{id: "post-distributed-genome-assembly-on-1000-computers",
        
          title: "Distributed Genome Assembly on 1000 Computers",
        
        description: "Lately, my research group has been collaborating with Prof. Scott Emrich on several problems in bioinformatics. Our students Chris Moretti and Mike Olson hav…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/distributed-genome-assembly-on-1000-computers/";
          
        },
      },{id: "post-multicore-abstractions-at-hpdc-2009",
        
          title: "Multicore Abstractions at HPDC 2009",
        
        description: "A paper by Li Yu and Christopher Moretti on our newest developments in distributed computing with abstractions has been accepted to HPDC 2009 in Munich. Harn…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/multicore-abstractions-at-hpdc-2009/";
          
        },
      },{id: "post-article-on-all-pairs-in-tpds",
        
          title: "Article on All-Pairs in TPDS",
        
        description: "Our most recent article on All-Pairs has been accepted to the IEEE Transactions on Parallel and Distributed Computing.  This article presents new development…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/article-on-all-pairs-in-tpds/";
          
        },
      },{id: "post-on-parallel-programming-with-processes",
        
          title: "On Parallel Programming with Processes",
        
        description: "About once a week, a well-meaning person stops by my office to ask a question like this: I need to run about 1000 simulations that take about an hour each.  …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/on-parallel-programming-with-processes/";
          
        },
      },{id: "post-exponential-backoff-in-distributed-systems",
        
          title: "Exponential Backoff in Distributed Systems",
        
        description: "In response to my previous article, a commenter asked: Why exponential backoff? To put a finer point on the question, How should I choose the parameters for …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/exponential-backoff-in-distributed-systems/";
          
        },
      },{id: "post-chirp-on-the-blue-gene-p-at-supercomputing",
        
          title: "Chirp on the Blue Gene/P at Supercomputing",
        
        description: "In a recent paper at IEEE/ACM Supercomputing, researchers at Argonne National Lab deployed our Chirp filesystem on hundreds of intermediate nodes to support …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/chirp-on-the-blue-genep-at-supercomputing/";
          
        },
      },{id: "post-bxgrid-featured-in-isgtw",
        
          title: "BXGrid Featured in ISGTW",
        
        description: "Our work on the Biometrics Research Grid (BXGrid), was the feature story in this week&#39;s issue of International Science Grid This Week.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/bxgrid-featured-in-isgtw/";
          
        },
      },{id: "post-fail-fast-fail-often",
        
          title: "Fail Fast, Fail Often",
        
        description: "A common misconception among programmers is that software should always attempt to hide failures in distributed systems. This idea seems sensible at first, b…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/fail-fast-fail-often/";
          
        },
      },{id: "post-audit-trails-in-voting-machines",
        
          title: "Audit Trails in Voting Machines",
        
        description: "Kim Zetter at Wired magazine recently wrote about the use of log files in electronic voting machines . (It actually shows snippets of the relevant data, whic…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/audit-trails-in-voting-machines/";
          
        },
      },{id: "post-bxgrid-at-ieee-e-science-2008",
        
          title: "BXGrid at IEEE e-Science 2008",
        
        description: "At the IEEE e-Science conference held in Indianapolis in December 2008, Hoang Bui presented this poster on BXGrid , the Biometrics Research Grid.  Prof. Thai…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/bxgrid-at-ieee-e-science-2008/";
          
        },
      },{id: "post-ccl-in-the-indiana-diagrid",
        
          title: "CCL in the Indiana Diagrid",
        
        description: "Our 600-CPU Condor pool at Notre Dame forms a small part of the Indiana statewide DiaGrid , which exploits about twenty thousand CPUs all managed by the Cond…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2009/ccl-in-the-indiana-diagrid/";
          
        },
      },{id: "post-bxgrid-the-biometrics-research-grid",
        
          title: "BXGrid: The Biometrics Research Grid",
        
        description: "One of our graduate students, Hoang Bui, presented a poster on the Biometrics Research Grid (BXGrid) at the IEEE e-Science conference in Indianapolis a few w…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/bxgrid-the-biometrics-research-grid/";
          
        },
      },{id: "post-abstractions-grids-and-clouds-at-ieee-e-science-2008",
        
          title: "Abstractions, Grids, and Clouds at IEEE e-Science 2008",
        
        description: "I just attended the IEEE conference on e-Science in Indianapolis, and gave this talk on harnessing distributed systems with high level abstractions . Another…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/abstractions-grids-and-clouds-at-ieee-e-science-2008/";
          
        },
      },{id: "post-visualizing-clusters-in-real-time",
        
          title: "Visualizing Clusters in Real Time",
        
        description: "The end of the semester is nearing, so activity in our distributed system really shoots up as undergraduates finish their semester projects and graduate stud…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/visualizing-clusters-in-real-time/";
          
        },
      },{id: "post-visualizing-a-large-distributed-system-with-enavis",
        
          title: "Visualizing a Large Distributed System with Enavis",
        
        description: "Two students at Notre Dame, Qi Liao and Andrew Blaich, recently received the Best Paper award at USENIX LISA for their work on Enavis, a tool that gives a vi…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/visualizing-a-large-distributed-system-with-enavis/";
          
        },
      },{id: "post-the-wavefront-abstraction",
        
          title: "The Wavefront Abstraction",
        
        description: "This is the third in a series of posts on the idea of abstractions for distributed computing on clusters, clouds, and grids. An abstraction is a simple inter…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/the-wavefront-abstraction/";
          
        },
      },{id: "post-an-abstraction-for-ensemble-classifiers",
        
          title: "An Abstraction for Ensemble Classifiers",
        
        description: "In the last post, I presented the idea of abstractions for distributed computing, and explained the All-Pairs abstraction , which represents a very large Car…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/an-abstraction-for-ensemble-classifiers/";
          
        },
      },{id: "post-cctools-release-2-4-6",
        
          title: "CCTools Release 2.4.6",
        
        description: "We are pleased to announce release 2.4.6 of the Cooperative Computing Tools, including Parrot, Chirp, and other tools which may be downloaded here: http://ww…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/cctools-release-246/";
          
        },
      },{id: "post-abstractions-at-cca08",
        
          title: "Abstractions at CCA08",
        
        description: "Prof. Thain gave a talk titled &quot;Programming Distributed Systems with High Level Abstractions&quot; at the Cloud Computing and Applications Workshop held at the Un…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/abstractions-at-cca08/";
          
        },
      },{id: "post-enavis-at-lisa-2008",
        
          title: "ENAVis at LISA 2008",
        
        description: "Qi Liao will present a paper on ENAVis , a dynamic visualization of user, program, and network data collected by the Lockdown enterprise system management tool.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/enavis-at-lisa-2008/";
          
        },
      },{id: "post-abstractions-for-distributed-computing",
        
          title: "Abstractions for Distributed Computing",
        
        description: "My current research revolves around the idea of abstractions for distributed computing. An abstraction is a way of simplifying a workload that runs on thousa…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/abstractions-for-distributed-computing/";
          
        },
      },{id: "post-abstractions-for-data-mining-at-icdm",
        
          title: "Abstractions for Data Mining at ICDM",
        
        description: "Chris Moretti and Karsten Steinhauser recently had a paper Scaling Up Classifiers to Cloud Computers accepted at the International Conference on Data Mining …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/abstractions-for-data-mining-at-icdm/";
          
        },
      },{id: "post-troubleshooting-distributed-systems-via-data-mining",
        
          title: "Troubleshooting Distributed Systems via Data Mining",
        
        description: "One of our students, David Cieslak, just presented this paper on troubleshooting large distributed systems at the IEEE Grid Computing Conference in Japan.  H…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/troubleshooting-distributed-systems-via-data-mining/";
          
        },
      },{id: "post-clusters-grids-and-clouds-it-amp-39-s-turtles-all-the-way-down",
        
          title: "Clusters, Grids, and Clouds:It&amp;#39;s Turtles All the Way Down",
        
        description: "In this blog, I&#39;ll discuss open problems and new developments in the field of distributed systems. A distributed system is a set of independent computers tha…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/clusters-grids-and-cloudsit39s-turtles-all-the-way-down/";
          
        },
      },{id: "post-cctools-2-4-4-released",
        
          title: "CCTools 2.4.4 Released",
        
        description: "We are pleased to announce release 2.4.4 of the Cooperative Computing Tools, including Parrot, Chirp, and other tools which may be downloaded here: http://ww…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/cctools-244-released/";
          
        },
      },{id: "post-troubleshooting-at-grid-2008",
        
          title: "Troubleshooting at Grid 2008",
        
        description: "David Cieslak will present a paper titled Troubleshooting Thousands of Jobs on Production Computing Grids Using Data Mining Techniques at Grid 2008 in Japan.…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/troubleshooting-at-grid-2008/";
          
        },
      },{id: "post-datalab-at-hpdc-2008",
        
          title: "Datalab at HPDC 2008",
        
        description: "Brandon Rich presented a poster on DataLab: Active Storage for Data Drive Scientific Computing at High Performance Distributed Computing in Boston. DataLab i…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/datalab-at-hpdc-2008/";
          
        },
      },{id: "post-cctools-2-4-3-released",
        
          title: "CCTools 2.4.3 Released",
        
        description: "We are pleased to announce release 2.4.3 of the Cooperative Computing Tools, including Parrot, Chirp, and other tools which may be downloaded here . Major it…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/cctools-243-released/";
          
        },
      },{id: "post-nsf-summer-reu-grant",
        
          title: "NSF Summer REU Grant",
        
        description: "The CCL has received a grant from the National Science Foundation which will support two undergraduates in summer 2008 to participate in the construction of …",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/nsf-summer-reu-grant/";
          
        },
      },{id: "post-ccl-to-participate-in-google-ibm-cluster-pilot",
        
          title: "CCL to Participate in Google/IBM Cluster Pilot",
        
        description: "In the 2008-2009 school year, junior and senior students in the CSE department will have the opportunity to learn techniques for large scale computing on clu…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/ccl-to-participate-in-googleibm-cluster-pilot/";
          
        },
      },{id: "post-papers-at-ipdps-2008",
        
          title: "Papers at IPDPS 2008",
        
        description: "At IPDPS 2008 in Miami, Chris Moretti presented All-Pairs: An Abstraction for Data Intensive Cloud Computing , and Kyle Wheeler presented QThreads: An API fo…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/papers-at-ipdps-2008/";
          
        },
      },{id: "post-parrot-flies-at-fermilab",
        
          title: "Parrot Flies at Fermilab",
        
        description: "Parrot and the GROW filesystem are in production use at Fermi National Laboratory.  The CDF experiment exploits the open Science Grid to run a large number o…",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2008/parrot-flies-at-fermilab/";
          
        },
      },{id: "alt-makeflow",
          title: 'Makeflow',
          description: "Makeflow is a workflow system for executing large complex workflows on clusters, clouds, and grids.",
          section: "Alt",handler: () => {
              window.location.href = "/alt/makeflow/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-data-intensive-grid-computing-on-active-storage-clusters",
          title: 'Data Intensive Grid Computing on Active Storage Clusters',
          description: "Description goes here.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/career/";
            },},{id: "projects-completed-project-daspos-data-and-software-preservation-for-open-science",
          title: 'Completed Project: DASPOS: Data and Software Preservation for Open Science',
          description: "The DASPOS project developed techniques and tools to enable the preservation and re-use of data intensive scientific analyses over long time periods.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/daspos/";
            },},{id: "projects-debugging-grids-with-machine-learning-techniques",
          title: 'Debugging Grids with Machine Learning Techniques',
          description: "Description goes here.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/debug-grids/";
            },},{id: "projects-filesystems-for-grid-computing",
          title: 'Filesystems for Grid Computing',
          description: "Description goes here.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/gridfs/";
            },},{id: "projects-pose-phase-i-harmony-harmonizing-the-high-performance-python-workflow-ecosystem",
          title: 'POSE Phase I: HARMONY: Harmonizing the High Performance Python Workflow Ecosystem',
          description: "This Pathways to Open-Source Ecosystems (POSE) project seeks to &#39;harmonize&#39; Python programming language based workflow management, build sustainability, and better support complex computational workflows, both in research and commercial environments.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/harmony/";
            },},{id: "projects-data-intensive-abstractions-for-high-end-biometric-applications",
          title: 'Data Intensive Abstractions for High End Biometric Applications',
          description: "Description goes here.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hecura/";
            },},{id: "projects-scalable-data-analysis-applications-for-high-energy-physics",
          title: 'Scalable Data Analysis Applications for High Energy Physics',
          description: "Expresses workflow I/O intentions using consistency contracts to enable efficient, cluster-wide storage and execution optimizations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hep/";
            },},{id: "projects-nbflow-from-notebook-to-workflow-and-back-again-cssi-framework",
          title: 'NBFlow: From Notebook to Workflow and Back Again (CSSI Framework)',
          description: "NBFlow brings together interactive notebook technologies (Jupyter), reproducibility tools (SciUnit), and distributed workflows (TaskVine) to enable easy execution of large-scale notebook workflows on heterogeneous HPC clusters.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/nbflow/";
            },},{id: "projects-pledge-accelerating-data-intensive-scientific-workflows-with-consistency-contracts",
          title: 'Pledge: Accelerating Data Intensive Scientific Workflows with Consistency Contracts',
          description: "Expresses workflow I/O intentions using consistency contracts to enable efficient, cluster-wide storage and execution optimizations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pledge/";
            },},{id: "projects-sade-a-safety-aware-ecosystem-of-reputable-suas",
          title: 'SADE: A Safety-Aware Ecosystem of Reputable sUAS',
          description: "The overall goal of the project is to develop technology for safety zones that permit only trusted drones to operate in congested or sensitive airspace.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sade/";
            },},{id: "projects-sub-identities-practical-containment-for-distributed-systems",
          title: 'Sub Identities: Practical Containment for Distributed Systems',
          description: "Description goes here.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/subid/";
            },},{id: "projects-taskvine-a-user-level-framework-for-data-intensive-scientific-applications-cssi-element",
          title: 'TaskVine: A User Level Framework for Data Intensive Scientific Applications (CSSI Element)',
          description: "TaskVine is open source software for building large scale data intensive dynamic workflows that run on HPC clusters, GPU clusters, and commercial clouds.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/taskvine/";
            },},{id: "projects-completed-project-vc3-virtual-clusters-for-community-computation-2016-2019",
          title: 'Completed Project: VC3: Virtual Clusters for Community Computation (2016-2019)',
          description: "VC3 made it possible for researchers to easily aggregate and share resources, install custom software environments, and deploy clustering frameworks across multiple HPC facilities through the concept of “virtual clusters”.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vc3/";
            },},{id: "projects-xgfabric-coupling-sensor-networks-and-hpc-facilities-with-advanced-wireless-networks-for-near-real-time-simulation-of-digital-agriculture-doe-ascr",
          title: 'XGFabric : Coupling Sensor Networks and HPC Facilities with Advanced Wireless Networks for...',
          description: "This project will explore the design of systems for connecting remote wireless sensor networks with high performance computing systems.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/xgfabric/";
            },},{id: "softwares-allocfs-a-filesystem-with-allocations",
          title: 'AllocFS: A Filesystem With Allocations',
          description: "AllocFS is a filesystem that allows users to make guaranteed space allocations within an existing directory structure.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/allocfs/";
            },},{id: "softwares-all-pairs-abstraction",
          title: 'All-Pairs Abstraction',
          description: "The All-Pairs abstraction computes the Cartesian product of two sets, generating a matrix where each cell M[i,j] contains the output of the function F on objects A[i] and B[j].",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/allpairs/";
            },},{id: "softwares-awe-accelerated-weighted-ensemble",
          title: 'AWE - Accelerated Weighted Ensemble',
          description: "Accelerated Weighted Ensemble or AWE package provides a Python library for adaptive sampling of molecular dynamics.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/awe/";
            },},{id: "softwares-chirp-filesystem",
          title: 'Chirp Filesystem',
          description: "Chirp is a personal user-level distributed filesystem that can be used to export existing data into distributed systems. Chirp enables unprivileged users to share space securely, efficiently, and conveniently. When combined with Parrot, Chirp allows users to create custom wide-area distributed filesystems that span high performance computing clusters.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/chirp/";
            },},{id: "softwares-the-confuga-cluster-file-system",
          title: 'The Confuga Cluster File System',
          description: "Description goes here.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/confuga/";
            },},{id: "softwares-floability",
          title: 'Floability',
          description: "Floability is an NSF funded research project to enable the rapid and portable deployment of notebooks expressing complex scientific workflows across a wide range of cyberinfrastructure.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/floability/";
            },},{id: "softwares-ftsh-the-fault-tolerant-shell",
          title: 'ftsh - The Fault Tolerant Shell',
          description: "Description goes here.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/ftsh/";
            },},{id: "softwares-jx",
          title: 'JX',
          description: "JX (JSON Expressions) is an expression language for unstructured data. Adding to the standard JSON data description language, it provides operators, variables, functions, list comprehensions, and other conveniences to generate and query complex documents. JX is used throughout the CCTools to describe and query data.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/jx/";
            },},{id: "softwares-makeflow",
          title: 'Makeflow',
          description: "Makeflow is a workflow system for executing large complex workflows on clusters, clouds, and grids.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/makeflow/";
            },},{id: "softwares-parrot",
          title: 'Parrot',
          description: "Parrot is a transparent user-level virtual filesystem that allows any ordinary program to be attached to many different remote storage services. Parrot captures the system calls (open, read, write, stat, etc) of an application through the ptrace interface, and redirects them to remote services such as HDFS, iRODS, Chirp, and FTP. This allows one to construct custom distributed filesystems on clusters without requiring special privileges.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/parrot/";
            },},{id: "softwares-prune-the-preserving-run-environment",
          title: 'PRUNE: The Preserving Run Environment',
          description: "The Preserving Run Environment for reproducible computing.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/prune/";
            },},{id: "softwares-resource-monitor",
          title: 'Resource_monitor',
          description: "The Resource Monitor (RM) is used to accurately capture the resource consumption (CPU, RAM, I/O, Disk, GPU, etc) of applications running in distributed systems. Production applications are typically not single processes, but complex assemblies of scripts, libraries, and processes written in multiple languages. The resource monitor tracks all components accurately and provides the enforcement needed to execute applications reliable at scale.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/resource_monitor/";
            },},{id: "softwares-sand-scalable-assembly-at-notre-dame",
          title: 'SAND - Scalable Assembly at Notre Dame',
          description: "SAND - Scalable Assembly at Notre Dame",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/sand/";
            },},{id: "softwares-subid-sub-identity-toolkit",
          title: 'Subid: Sub-Identity Toolkit',
          description: "The Cooperative Computing Laboratory Sub-Identity Toolkit is a set of utilities and a Pluggable Authentication Module that provides users with the ability to create sub-users of themselves.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/subid/";
            },},{id: "softwares-taskvine",
          title: 'TaskVine',
          description: "TaskVine is our third-generation workflow system for building scalable data intensive applications that run on HPC clusters, cloud services, and other clusters.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/taskvine/";
            },},{id: "softwares-umbrella-software-environment-specification",
          title: 'Umbrella Software Environment Specification',
          description: "Umbrella is a tool for specifying and materializing comprehensive execution environments, from the hardware all the way up to software and data.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/umbrella/";
            },},{id: "softwares-the-wavefront-abstraction",
          title: 'The Wavefront Abstraction',
          description: "The Wavefront abstraction is used to express computations on a two-dimensional grid where each cell depends on its neighboring cells.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/wavefront/";
            },},{id: "softwares-work-queue",
          title: 'Work Queue',
          description: "Work Queue is an application framework for creating and managing dynamic manager-worker style programs that scale up to tens of thousands of machines on clusters, clouds, and grids.",
          section: "Softwares",handler: () => {
              window.location.href = "/softwares/workqueue/";
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
          window.open("/feed.xml", "_blank");
        },
      },];
