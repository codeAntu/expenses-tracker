// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from '@/components/ui/sidebar';
// import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';


// const items = [
//   {
//     title: 'Home',
//     url: '#',
//     icon: Home,
//   },
//   {
//     title: 'Inbox',
//     url: '#',
//     icon: Inbox,
//   },
//   {
//     title: 'Calendar',
//     url: '#',
//     icon: Calendar,
//   },
//   {
//     title: 'Search',
//     url: '#',
//     icon: Search,
//   },
//   {
//     title: 'Settings',
//     url: '#',
//     icon: Settings,
//   },
// ];


// export function AppSidebar() {
//   return (
//     <Sidebar collapsible='icon'>
//       <SidebarHeader>
//         <div className='flex items-center'>
//           {/* <Avatar className=''>
//             <AvatarImage src='https://github.com/shadcn.png' />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar> */}
//         </div>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup className=''>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon size={28} />
//                       <span className='text-lg font-medium text-black/70 dark:text-white/70'>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
