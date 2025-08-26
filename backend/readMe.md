## Currently working on

$$ frontend ideas
    - plan directory structure

    - auth
        reg
        login with token and bcrypt
    - private routes or protected routes for auth 
      check
  - owner/admin
      - admin/member/ navbar  
      - admin/member/ dashboard  
      - project component, with project details like 
        name, number of members, progress. for both owner/admin and members
      - dashboard with todo, in progress and completed coulmn
      - add task by admin/owner
      - edit task by admin/owner
      - delete task by admin/owner
      - comment task by admin/owner
      - assign  task to members by admin/owner
      - role change toggle inside the members list with 3 dots option
    - 
    
  - member
    - toggle task status
    - post comment.
    - edit comment.
    - delete comment.
  


- CRUD ops
- dedicated controllers for - 
      - completed
        - to change role- admin
        - add members (for owner and admin only).
        - delete member on the same project group member lists 
        - add tasks
        - edit tasks
        - list down the memebrs, get all members with role just 
          like whatsapp or telegram
        
      - pending
        - edit comment
        - delete comment
        - delete task
        - assigning task 
          - dedicated api for only existing members in the project.
        - 
        
- Member functionalities
      - delete comment with 3dots on the ri8 side
      - edit project details like.
            - dedicated 'updated on:' tag or text with updated date 
              and time.(so the user can identify 
              the updates easily).
            - this includes adding comments also
    - completed
      - Member can change the status like in progress, completed..
      - add comment in tasks(only assigned members and admin/owner 
        can comment)
      - edit comment with 3dots on the ri8 side
      - 
      

## methods can be used in this for filtering and other array ops
  ## reduce 
    can utilize 'reduce' fn to group the users according to admin and member.
  ## Deep filtering object
    using .some , will pick up the matched value from the array.  
    
    Simple filtering → filter()

    Single item → find()

    Nested data → flatMap() or reduce()

    Existence check → some()/every()    
  

## Next focus

- member apis
- CRUD for members.

## completed

- login reg with jwt and bcrypt
- creating(post) project with owner id
- fetching (get) all projects with for admin

## Schema ideas

Save project id to user data in an array where all the project id will be stored

or

object id is better? check on this.
    - helpful id filter, map functions. so keep it 

member addition- check user data and block foreign 

## need to add comment section with latest comments at the bottom with time added..

==dummy data==

{
"name": "Internal Tool Revamp",
"description": "Upgrade the old internal dashboard with new features.",
"members": [],
"tasks": [
{
"title": "Migrate old endpoints",
"description": "Replace legacy API calls with updated ones.",
"dueDate": "2025-07-10T00:00:00.000Z",
"assignedTo": "64d5f1c62fc3bd001f823457",
"priority": "High",
"status": "In Progress",
"comments": []
},
{
"title": "Design login page"
}
]
}

<!-- ======================== -->

Sure thing! Here are five JSON-style project objects that follow the same structure and spirit as your "Internal Tool Revamp"—each with varied titles, descriptions, tasks, and priorities:

---

### 🛠 Sample Projects

```json
{
  "name": "Customer Portal Redesign",
  "description": "Modernize the customer interface with improved UX flows.",
  "members": [],
  "tasks": [
    {
      "title": "Audit existing user feedback",
      "description": "Collect and analyze feedback from customer surveys.",
      "dueDate": "2025-07-15T00:00:00.000Z",
      "assignedTo": "64d5f1c62fc3bd001f823458",
      "priority": "Medium",
      "status": "Pending",
      "comments": []
    },
    {
      "title": "Implement responsive design"
    }
  ]
}
```

```json
{
  "name": "Data Warehouse Migration",
  "description": "Move legacy data infrastructure to cloud-based BigQuery.",
  "members": [],
  "tasks": [
    {
      "title": "Schema mapping",
      "description": "Match old schema fields with new data model.",
      "dueDate": "2025-07-20T00:00:00.000Z",
      "assignedTo": "64d5f1c62fc3bd001f823459",
      "priority": "High",
      "status": "In Progress",
      "comments": []
    },
    {
      "title": "ETL pipeline setup"
    }
  ]
}
```

```json
{
  "name": "Mobile App Launch",
  "description": "Release the new productivity mobile app to app stores.",
  "members": [],
  "tasks": [
    {
      "title": "Beta testing",
      "description": "Collect feedback from internal users before public launch.",
      "dueDate": "2025-07-12T00:00:00.000Z",
      "assignedTo": "64d5f1c62fc3bd001f823460",
      "priority": "High",
      "status": "In Progress",
      "comments": []
    },
    {
      "title": "Publish to Play Store"
    }
  ]
}
```

```json
{
  "name": "HR System Automation",
  "description": "Automate the leave approval workflow for HR operations.",
  "members": [],
  "tasks": [
    {
      "title": "Create approval logic",
      "description": "Implement dynamic approval chains using rule engine.",
      "dueDate": "2025-07-09T00:00:00.000Z",
      "assignedTo": "64d5f1c62fc3bd001f823461",
      "priority": "Medium",
      "status": "In Review",
      "comments": []
    },
    {
      "title": "UI for leave tracking"
    }
  ]
}
```

```json
{
  "name": "Analytics Dashboard Upgrade",
  "description": "Improve performance and visualization in the reporting dashboard.",
  "members": [],
  "tasks": [
    {
      "title": "Add real-time charts",
      "description": "Integrate WebSocket and real-time visual components.",
      "dueDate": "2025-07-14T00:00:00.000Z",
      "assignedTo": "64d5f1c62fc3bd001f823462",
      "priority": "High",
      "status": "Not Started",
      "comments": []
    },
    {
      "title": "Refactor chart components"
    }
  ]
}
```
=========================
with members added
------------------
{
  "name": "Marketing Site Redesign",
  "description": "A complete overhaul of the landing page experience for better conversion.",
  "members": [
    {
      "user": "64d5f1c62fc3bd001f823401",
      "role": "Admin"
    },
    {
      "user": "64d5f1c62fc3bd001f823402",
      "role": "Member"
    }
  ],
  "tasks": [
    {
      "title": "Wireframe Homepage",
      "description": "Sketch initial layout concepts for the homepage redesign.",
      "dueDate": "2025-07-10T12:00:00.000Z",
      "assignedTo": [
        "64d5f1c62fc3bd001f823401"
      ],
      "priority": "High",
      "comments": [
        {
          "text": "Make sure to incorporate product card design"
        }
      ],
      "status": "Todo"
    },
    {
      "title": "SEO Audit",
      "description": "Check current site for keyword rankings and crawl issues.",
      "dueDate": "2025-07-15T18:00:00.000Z",
      "assignedTo": [
        "64d5f1c62fc3bd001f823402"
      ],
      "priority": "Medium",
      "status": "In Progress"
    }
  ]
}



=======================
{
  "name": "Marketing Site Redesign",
  "description": "A complete overhaul of the landing page experience for better conversion.",
  "members": [],
  "tasks": [
    {
      "title": "Wireframe Homepage",
      "description": "Sketch initial layout concepts for the homepage redesign.",
      "assignedTo": [],
      "priority": "High",
      "comments": [],
      "status": "Todo"
    }
  ]
}

====================

---

These examples should slot nicely into your workflow and are easily extendable. Want to link these projects to a team or auto-generate task IDs next?
