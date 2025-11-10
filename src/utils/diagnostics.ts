/**
 * Utilidades de diagnóstico para verificar la conectividad con el gateway GraphQL
 */

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://jellyfish-app-lj4xj.ondigitalocean.app/graphql';

interface DiagnosticResult {
  success: boolean;
  gatewayUrl: string;
  status?: number;
  statusText?: string;
  error?: string;
  timestamp: string;
  suggestions?: string[];
}

/**
 * Verifica si el gateway GraphQL es accesible
 */
export async function checkGatewayHealth(): Promise<DiagnosticResult> {
  const timestamp = new Date().toISOString();
  
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log('🔍 Gateway Health Check');
    console.log(`${'='.repeat(60)}`);
    console.log(`🌐 Gateway URL: ${GRAPHQL_URL}`);
    
    // Intentar una petición simple de prueba
    const testQuery = `
      query HealthCheck {
        __schema {
          queryType {
            name
          }
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: testQuery }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Gateway is accessible`);
      console.log(`📊 Status: ${response.status} ${response.statusText}`);
      console.log(`${'='.repeat(60)}\n`);
      
      return {
        success: true,
        gatewayUrl: GRAPHQL_URL,
        status: response.status,
        statusText: response.statusText,
        timestamp,
      };
    } else {
      console.error(`❌ Gateway returned error: ${response.status} ${response.statusText}`);
      console.log(`${'='.repeat(60)}\n`);
      
      return {
        success: false,
        gatewayUrl: GRAPHQL_URL,
        status: response.status,
        statusText: response.statusText,
        timestamp,
        suggestions: [
          '1. Verify gateway is running on the correct endpoint',
          '2. Check if CORS is configured on the gateway',
          '3. Verify the gateway URL in .env.local',
        ],
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to reach gateway`);
    console.error(`📋 Error: ${errorMessage}`);
    console.log(`${'='.repeat(60)}\n`);

    return {
      success: false,
      gatewayUrl: GRAPHQL_URL,
      error: errorMessage,
      timestamp,
      suggestions: [
        '1. Gateway appears to be unreachable or offline',
        '2. Check network connectivity',
        '3. Verify DNS resolution for the gateway URL',
        '4. Check if gateway requires authentication',
        '5. Look at browser Network tab in DevTools',
      ],
    };
  }
}

/**
 * Ejecuta diagnósticos completos
 */
export async function runFullDiagnostics(): Promise<void> {
  console.log(`\n${'🚀'.repeat(30)}`);
  console.log('FULL GATEWAY DIAGNOSTICS');
  console.log(`${'🚀'.repeat(30)}\n`);

  const healthCheck = await checkGatewayHealth();

  console.log('📋 Diagnostic Report:');
  console.log(`   Gateway URL: ${healthCheck.gatewayUrl}`);
  console.log(`   Status: ${healthCheck.success ? '✅ OK' : '❌ FAILED'}`);
  if (healthCheck.status) {
    console.log(`   HTTP Status: ${healthCheck.status} ${healthCheck.statusText}`);
  }
  if (healthCheck.error) {
    console.log(`   Error: ${healthCheck.error}`);
  }
  
  if (healthCheck.suggestions && healthCheck.suggestions.length > 0) {
    console.log('\n💡 Suggestions:');
    healthCheck.suggestions.forEach(suggestion => {
      console.log(`   ${suggestion}`);
    });
  }

  console.log(`\n${'🚀'.repeat(30)}\n`);
}
