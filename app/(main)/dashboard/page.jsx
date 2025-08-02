"use client"

import { useConvexQuery } from '@/hooks/use-convex-query';
import React from 'react'
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Plus ,Sparkle} from 'lucide-react';
import { NewProjectModal } from "./_components/new-project-modal";
import { BarLoader } from 'react-spinners';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Dashboard = () => {

  const [showNewProjectModal, setshowNewProjectModal] = useState(false)

  const { data: project, isLoading } = useConvexQuery(api.projects.getUsersProjects);
 
  return (
    <div className='min-h-scren pt-32 pb-16'>
      <div className='container mx-auto px-6'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-white mb-2'>Your projects</h1>
            <p className='text-white/70'>
              Create and manage your AI-powered image design</p>
          </div>

          <Button onClick={() => setshowNewProjectModal(true)} variant="primary" size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            New Button
          </Button>
        </div>

        {isLoading ? (
          <BarLoader width={'100%'} color='cyan' />
        ) : projects && projects.lenght > 0 ? (
          <></>
        ) : (
          <div> <div className='flex flex-col items-center justify-center py-20 text-center'>
            <h3 className='text-2xl font-semibold text-white mb-3'>
              Create your First Project
            </h3>
           
            <p className='text-white/70 mb-8 max-w-md'>
              Upload an image to Start editing</p>
            <Button onClick={() => setshowNewProjectModal(true)} variant="primary" size="xl" className="gap-2">
              <Sparkle className="h-5 w-5" />
              ADD IMAGE
            </Button>

          </div>
          </div>

        )}
       <NewProjectModal
       isOpen={showNewProjectModal}
       onClose={()=>setshowNewProjectModal(false)}
       
       />
      

      </div>
    </div>
  )
}

export default Dashboard
