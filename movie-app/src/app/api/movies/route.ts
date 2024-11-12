import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET(req: NextRequest) {
    let allMovies;
    let data;

    if (req.nextUrl.searchParams.get('movie')) {
        data = req.nextUrl.searchParams.get('movie');
    }
    
    if (!data) {
        allMovies = await prisma.movies.findMany();
    } else {
        allMovies = await prisma.movies.findMany({
            where: {
                name: data,
            }
        })
    }

    return NextResponse.json(
        allMovies
    );
}