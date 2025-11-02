declare module '@payloadcms/live-preview/react' {
  import { FC } from 'react'

  export interface RefreshRouteOnSaveProps {
    refresh: () => void
  }

  export const RefreshRouteOnSave: FC<RefreshRouteOnSaveProps>
}
