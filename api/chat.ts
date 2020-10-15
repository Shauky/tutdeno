 // IS EXPOSED
// <==== look at example, public and api folders for usage

import {
  WebSocket,
  isWebSocketCloseEvent,
} from 'https://deno.land/std/ws/mod.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

const users = new Map<string, WebSocket>()

function broadcast(message: string, senderId?: string): void {
  if (!message) return
  for (const user of users.values()) {
    user.send(senderId ? `${message}` : message)
  }
}

export default async function chat(ws: WebSocket): Promise<void> {
  const userId = v4.generate()
  // Register user connection
  users.set(userId, ws)
    const newuser = userId.slice(0, -29).toString();
    broadcast(`${newuser} is connected`)
    // topuser.push(newuser);
    console.log(newuser);
  // Wait for new messages
  for await (const event of ws) {
     const message = typeof event === 'string' ? `${newuser} :- ${event}` : '';
     broadcast(message, newuser)

    // Unregister user conection
    if (!message && isWebSocketCloseEvent(event)) {
      users.delete(userId)
      broadcast(`${userId} is disconnected`)
      break
    }
  }
}
