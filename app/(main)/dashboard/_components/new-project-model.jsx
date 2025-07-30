import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePlanAccess } from '@/hooks/use-plan-access'
import { Badge } from '@/components/ui/badge'
import { useConvexQuery } from '@/hooks/use-convex-query'
import { api } from '@/convex/_generated/api'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Crown, Terminal } from 'lucide-react'


const NewProjectModel = ({ isOpen, onClose }) => {

  const handleClose = () => {
    onClose();

  };






  const { isFree, canCreateProject } = usePlanAccess();
  const { data: projects } = useConvexQuery(api.project.getUserProjects);


  const currentProjectCount = projects?.length || 0;
  const canCreate = canCreateProject(currentProjectCount)
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Create New Project</DialogTitle>
            {isFree && (
              <Badge variant="secondary" className="bg-slate-700 text-white/70">{currentProjectCount}/3 projects</Badge>
            )}
          </DialogHeader>
          <div className='space-y-6'>
            {isFree && currentProjectCount>=2 &&(
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <Crown />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                <div className="font-semibold text-amber-400 mb-1">
                    {currentProjectCount === 2
                      ? "Last Free Project"
                      : "Project Limit Reached"}
                  </div>
                    {currentProjectCount === 2
                    ? "This will be your last free project. Upgrade to Pixxel Pro for unlimited projects."
                    : "Free plan is limited to 3 projects. Upgrade to Pixxel Pro to create more projects."}
              </AlertDescription>
            </Alert>)}
          </div>
          <DialogFooter>Ok</DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewProjectModel
