'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React from 'react';
import "../../styles/dark-theme.css"
import { FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin, useIsEditorReady } from '@liveblocks/react-lexical';
import Loader from '../Loader';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin'

// import { useThreads } from '@liveblocks/react/suspense';

import { useThreads, useUser } from '@liveblocks/react/suspense';
import Comments from '../Comments';
import CloseDeleteModal from '../CloseDeleteModal';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({ roomId, currentUserType }: {
  roomId: string, currentUserType: UserType
}) {

  const isReady = useIsEditorReady();

  const {threads} = useThreads();

  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === "editor",
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className='toolbar-wrapper flex min-w-full flex-between'>
          <ToolbarPlugin />
          {currentUserType === "editor" && <CloseDeleteModal 
          className='cursor-pointer'
          roomId={roomId} />}
        </div>

        <div className='editor-wrapper flex flex-col items-center justify-start'>
          {!isReady ?
            <Loader />
            :
            <div className="editor-inner relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10 min-h-[1100px]">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="h-full editor-input" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {currentUserType === "editor" && <FloatingToolbarPlugin />}
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          }
          
          <LiveblocksPlugin>
            <FloatingComposer className='w-[350px]' />
            <FloatingThreads threads={threads}/>
            <Comments />
          </LiveblocksPlugin>
        </div>

      </div>
    </LexicalComposer>
  );
}
