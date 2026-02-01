import { IssueType } from "@/constants/issue_types";
export const issues: IssueType[] = [
    {
        "id": 1001,
        "title": "Broken Login System",
        "profile_image": "https://dummyimage.com/100x100/000/646ce3.png&text=User+Profile",
        "username": "john_doe",
        "reported_text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi dolorem eos ducimus inventore, perferendis vel expedita deserunt obcaecati voluptates, voluptas sit atque debitis modi eaque voluptate numquam voluptatem quisquam aspernaturLorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi dolorem eos ducimus inventore, perferendis vel expedita deserunt obcaecati voluptates, voluptas sit atque debitis modi eaque voluptate numquam voluptatem quisquam aspernatur?",
        "reported_images": [
            "https://dummyimage.com/700x700/000/646ce3.png&text=Image+1",
            "https://dummyimage.com/700x700/000/646ce3.png&text=Image+2", 
            "https://dummyimage.com/700x700/000/646ce3.png&text=Image+3"
        ],
        "command_count": 5,
        "reported_date": "01-21-2026",
        "is_viewed": false
    },
    {
        "id": 1002,
        "title": "Payment Gateway Issue",
        "profile_image": "https://dummyimage.com/100x100/000/ff6b6b.png&text=User+2",
        "username": "jane_smith",
        "reported_text": "Users are unable to complete payments through our platform. The transaction fails at the final confirmation step. This has been reported by multiple customers throughout the day.",
        "reported_images": [
            "https://dummyimage.com/700x700/000/ff6b6b.png&text=Payment+Error",
            "https://dummyimage.com/700x700/000/ff6b6b.png&text=Error+Screen"
        ],
        "command_count": 12,
        "reported_date": "01-20-2026",
        "is_viewed": true
    },
    {
        "id": 1003,
        "title": "Mobile App Crashing on Launch",
        "profile_image": "https://dummyimage.com/100x100/000/4ecdc4.png&text=User+3",
        "username": "alex_wong",
        "reported_text": "The iOS app crashes immediately after opening on devices running iOS 17.4. This affects approximately 30% of our iOS user base.",
        "reported_images": [
            "https://dummyimage.com/700x700/000/4ecdc4.png&text=Crash+Report",
            "https://dummyimage.com/700x700/000/4ecdc4.png&text=Debug+Info",
            "https://dummyimage.com/700x700/000/4ecdc4.png&text=Stack+Trace",
            "https://dummyimage.com/700x700/000/4ecdc4.png&text=Device+Info"
        ],
        "command_count": 8,
        "reported_date": "01-19-2026",
        "is_viewed": false
    },
    {
        "id": 1004,
        "title": "Slow Database Queries",
        "profile_image": "https://dummyimage.com/100x100/000/ffd166.png&text=User+4",
        "username": "dev_team",
        "reported_text": "Customer reports page is taking 8-10 seconds to load due to inefficient database queries. This impacts our support team's productivity significantly.",
        "reported_images": [
            "https://dummyimage.com/700x700/000/ffd166.png&text=Query+Metrics",
            "https://dummyimage.com/700x700/000/ffd166.png&text=Performance+Chart"
        ],
        "command_count": 3,
        "reported_date": "01-22-2026",
        "is_viewed": false
    },
    {
        "id": 1005,
        "title": "UI Alignment Issues on Mobile",
        "profile_image": "https://dummyimage.com/100x100/000/06d6a0.png&text=User+5",
        "username": "ui_designer",
        "reported_text": "The dashboard elements are misaligned on mobile devices with screen widths between 375px and 425px. Buttons overlap with text fields making the interface unusable.",
        "reported_images": [
            "https://dummyimage.com/700x700/000/06d6a0.png&text=Mobile+View+1",
            "https://dummyimage.com/700x700/000/06d6a0.png&text=Mobile+View+2",
            "https://dummyimage.com/700x700/000/06d6a0.png&text=Overlap+Issue"
        ],
        "command_count": 6,
        "reported_date": "01-18-2026",
        "is_viewed": true
    }
];